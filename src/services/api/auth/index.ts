import http from 'configs/http';

import { signInParams, signUpParams, confirmationParams } from 'models';
import { SIGN_IN_API, SIGN_UP_API, CONFIRMATION_API } from 'constants/routes';

export function signIn(data: signInParams) {
  return http.post(SIGN_IN_API, { user: data });
}

export function signUp(data: signUpParams) {
  return http.post(SIGN_UP_API, { user: data });
}

export function confirmation(data: confirmationParams) {
  return http.put(CONFIRMATION_API, { user: data });
}
