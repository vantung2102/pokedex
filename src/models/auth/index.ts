import * as yup from 'yup';

export interface signInParams {
  email: string;
  password: string;
}

export interface signUpParams {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface confirmationParams {
  confirmation_token: string;
}

export const signInSchema = yup.object({
  email: yup.string().required('Email is required').email('Enter a valid email address'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

export const signUpSchema = yup.object({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  email: yup.string().required('Email is required').email('Enter a valid email address'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  password_confirmation: yup
    .string()
    .required('Confirme password is required')
    .min(6, 'Confirme password must be at least 6 characters')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export const confirmationSchema = yup.object({
  confirmation_token: yup.string().required('Confirm token is required'),
});
