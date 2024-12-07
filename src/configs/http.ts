import qs from 'qs';
import axios from 'axios';
import ENV from 'constants/env';
import { camelizeKeys, decamelizeKeys } from 'humps';

import { useAuth } from 'hooks';

import { SIGN_IN_API } from 'constants/routes';

const http = axios.create({
  baseURL: ENV.BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

http.interceptors.response.use(
  (response) => {
    if (response.data && response.headers['content-type'] === 'application/json') {
      response.data = camelizeKeys(response.data);
    }

    return response;
  },
  async (error) => {
    const { config, response } = error;
    if (config?.url !== SIGN_IN_API && response?.status === 401) {
      useAuth.getState().logout();
    }
  },
);

http.interceptors.response.use(
  (config) => {
    const token = localStorage.getItem('Authorization');
    const newConfig = { ...config };

    if (token) {
      newConfig.headers.Authorization = token;
    }

    newConfig.paramsSerializer = (params) =>
      qs.stringify(params, {
        encode: false,
        arrayFormat: 'brackets',
      });

    if (newConfig.headers['Content-Type'] === 'multipart/form-data') {
      return newConfig;
    }

    if (config.params) {
      newConfig.params = decamelizeKeys(config.params);
    }

    if (config.data) {
      newConfig.data = decamelizeKeys(config.data);
    }

    return newConfig;
  },
  (error) => {
    Promise.reject(error);
  },
);

export default http;
