'use client';

import Link from 'next/link';
import toast from 'react-hot-toast';
import queryString from 'query-string';

import { useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter, usePathname } from 'next/navigation';

import { Input, Button } from '@nextui-org/react';

import { useAuth } from 'hooks';
import { signIn } from 'services';
import { signInParams, signInSchema } from 'models';

import { ROOT_PATH, SIGN_UP_PATH } from 'constants/routes';

const SignInPage = () => {
  const router = useRouter();
  const location = usePathname();
  const { isAuthenticated, setToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push(ROOT_PATH);
    }
  });

  const { mutate } = useMutation<AxiosResponse<any>, Error, signInParams>({
    mutationFn: signIn,
    onSuccess: (data: AxiosResponse) => {
      const token = data?.headers?.authorization;
      const redirect: string | (string | null)[] | null = queryString.parse(location).redirect;

      if (token) setToken({ token });

      if (typeof redirect === 'string') {
        router.push(redirect || ROOT_PATH);
      } else {
        router.push(ROOT_PATH);
      }
    },
    onError: () => {
      toast.error('Confirmation Failed');
    },
  });

  const onSubmit = async (data: signInParams) => {
    mutate(data);
  };

  return (
    <div className='rounded-lg w-[420px] bg-white shodow flex flex-col items-center'>
      <div className='flex justify-center items-center h-20 mx-5'>
        <img
          className='h-full mt-2'
          src='/images/pokemon-logo.png'
          alt='pokemon logo'
        />
      </div>

      <div className='flex flex-col items-center mx-5 gap-2'>
        <div className='flex flex-col items-center gap-2'>
          <h2 className='text-center text-2xl font-bold text-gray-900'>Log in to your Pokemon Trainer Club account</h2>

          <form
            className='flex flex-col items-center w-full gap-4'
            onSubmit={handleSubmit(onSubmit)}
          >
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

            <Button
              size='md'
              type='submit'
              color='success'
              className='w-full text-white font-bold'
            >
              Sign In
            </Button>
          </form>
        </div>

        <div className='mt-4 text-sm text-center text-gray-600'>
          Don’t have an account?{' '}
          <Link
            href={SIGN_UP_PATH}
            className='font-bold text-green-600 hover:underline'
          >
            Create an Account
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

export default SignInPage;
