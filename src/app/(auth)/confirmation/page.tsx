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
import { confirmation } from 'services';
import { confirmationParams, confirmationSchema } from 'models';

import { ROOT_PATH, SIGN_IN_PATH, SIGN_UP_PATH } from 'constants/routes';

const SignInPage = () => {
  const router = useRouter();
  const location = usePathname();
  const { isAuthenticated, setToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(confirmationSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push(ROOT_PATH);
    }
  });

  const { mutate } = useMutation<AxiosResponse<any>, Error, confirmationParams>({
    mutationFn: confirmation,
    onSuccess: () => {
      toast.success('Confirmation successful');

      router.push(SIGN_IN_PATH);
    },
    onError: () => {
      toast.error('Confirmation failed');
    },
  });

  const onSubmit = async (data: confirmationParams) => {
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
          <h2 className='text-center text-2xl font-bold text-gray-900'>
            Confirmation to your Pokemon Trainer Club account
          </h2>

          <form
            className='flex flex-col items-center w-full gap-4'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='w-full'>
              <Input
                size='sm'
                type='text'
                label='Confirmation token'
                {...register('confirmation_token')}
              />
              {errors.confirmation_token && <span style={{ color: 'red' }}>{errors.confirmation_token.message}</span>}
            </div>

            <Button
              size='md'
              type='submit'
              color='success'
              className='w-full text-white font-bold'
            >
              Confirm
            </Button>
          </form>
        </div>

        <div>
          <div className='mt-4 text-sm text-center text-gray-600'>
            <Link
              href={SIGN_IN_PATH}
              className='font-bold text-green-600 hover:underline'
            >
              Sign In
            </Link>

            {' | '}

            <Link
              href={SIGN_UP_PATH}
              className='font-bold text-green-600 hover:underline'
            >
              Create an Account
            </Link>
          </div>
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
