// Routes
export const ROOT_PATH = '/';

export const SIGN_IN_PATH = '/sign-in';
export const SIGN_UP_PATH = '/sign-up';
export const LOGOUT_PATH = '/logout';

export const CONFIRMATION_PATH = '/confirmation';

export const HOME_PATH = '/home';

export const PROFILE_PATH = '/profile';

export const NOT_FOUND_PATH = '/not-found';

export const DASHBOARD_PATH = '/dashboard';

export const ADMIN_PATH = '/admin';

export const PRIVATE_PATH = [ROOT_PATH, PROFILE_PATH, DASHBOARD_PATH, ADMIN_PATH];

// API
export const SIGN_IN_API = '/api/v1/auth/sign_in';
export const SIGN_UP_API = '/api/v1/auth/sign_up';
export const SIGN_OUT_API = '/api/v1/auth/sign_out';

export const CONFIRMATION_API = '/api/v1/auth/confirmation';

export const PROFILE_API = '/api/v1/auth/profile';
