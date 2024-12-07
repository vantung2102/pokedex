'use client';

import Link from 'next/link';
import toast from 'react-hot-toast';

import { useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input, Button } from '@nextui-org/react';

import { useAuth } from 'hooks';
import { signUp } from 'services';
import { signUpParams, signUpSchema } from 'models';

import { ROOT_PATH, SIGN_IN_PATH, CONFIRMATION_PATH } from 'constants/routes';

const SignUpPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push(ROOT_PATH);
    }
  });

  const { mutate } = useMutation<AxiosResponse<any>, Error, signUpParams>({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success('Sign up successful. Please check email to activate your account');

      router.push(CONFIRMATION_PATH);
    },
    onError: () => {
      toast.error('Sign up failed');
    },
  });

  const onSubmit = async (data: signUpParams) => {
    mutate(data);
  };

  return (
    <div className='rounded w-[420px] bg-white shodow flex flex-col items-center'>
      <div className='flex justify-center items-center h-20 mx-5'>
        <img
          className='h-full mt-2'
          src='/images/pokemon-logo.png'
          alt='pokemon logo'
        />
      </div>

      <div className='flex flex-col items-center mx-5 gap-2'>
        <div className='flex flex-col items-center gap-2'>
          <h2 className='text-center text-2xl font-bold text-gray-900'>Sign up to your Pokemon Trainer Club account</h2>

          <form
            className='flex flex-col items-center w-full gap-4'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='w-full'>
              <Input
                size='sm'
                type='text'
                label='First Name'
                {...register('first_name')}
              />
              {errors.first_name && <span style={{ color: 'red' }}>{errors.first_name.message}</span>}
            </div>

            <div className='w-full'>
              <Input
                size='sm'
                type='text'
                label='Last Name'
                {...register('last_name')}
              />
              {errors.last_name && <span style={{ color: 'red' }}>{errors.last_name.message}</span>}
            </div>

            <div className='w-full'>
              <Input
                size='sm'
                type='email'
                label='Email'
                {...register('email')}
              />
              {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
            </div>

            <div className='w-full'>
              <Input
                size='sm'
                type='password'
                label='Password'
                {...register('password')}
              />
              {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
            </div>

            <div className='w-full'>
              <Input
                size='sm'
                type='password'
                label='Confirm Password'
                {...register('password_confirmation')}
              />
              {errors.password_confirmation && (
                <span style={{ color: 'red' }}>{errors.password_confirmation.message}</span>
              )}
            </div>

            <Button
              size='md'
              type='submit'
              color='success'
              className='w-full text-white font-bold'
            >
              Sign Up
            </Button>
          </form>
        </div>

        <div className='mt-4 text-sm text-center text-gray-600'>
          Have an account?{' '}
          <Link
            href={SIGN_IN_PATH}
            className='font-bold text-green-600 hover:underline'
          >
            Sign In
          </Link>
        </div>

        <div className='mt-6 text-xs text-center text-gray-500 mb-2'>
          ©2024 Pokémon.
          <br />
          ©1995 - 2024 Nintendo/Creatures Inc./GAME FREAK inc. TM, ®Nintendo.
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
