import { create } from 'zustand';

interface AuthState {
  loading: boolean;
  token: string | null;
  isAuthenticated: boolean;
  error: Error | null | unknown;
  logout: () => void;
  setToken: ({ token }: { token: string }) => void;
}

let token = null;
if (typeof window !== 'undefined') {
  token = localStorage.getItem('Authorization');
}

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

export const useAuth = create<AuthState>((set) => ({
  ...initialState,
  setToken: ({ token }) => {
    try {
      localStorage.setItem('Authorization', token);
      set(() => ({ token, isAuthenticated: true }));
    } catch (error) {
      set(() => ({ error }));
    }
  },
  logout: () => {
    localStorage.removeItem('Authorization');
    set(() => ({ ...defaultState, isAuthenticated: false }));
  },
}));
