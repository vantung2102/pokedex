import { create } from 'zustand';

const token = localStorage.getItem('Authorization');

const defaultState = {
  token: null,
  error: null,
  loading: false,
};

const initialState = {
  ...defaultState,
  token,
  isAuthenticated: !!token,
};

export const useAuth = create((set) => ({
  ...initialState,
  login: async ({ token }) => {
    try {
      localStorage.setItem('Authorization', token);
      set(() => ({ token, isAuthenticated: true }));
    } catch (error) {
      set(() => ({ error }));
    }
  },
  logout: async () => {
    try {
      localStorage.removeItem('Authorization');
      set(() => ({ ...defaultState, isAuthenticated: false }));
    } catch (error) {
      set(() => ({ error }));
    }
  },
}));
