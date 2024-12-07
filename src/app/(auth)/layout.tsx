'use client';

import React from 'react';
import clsx from 'clsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div
        className={clsx(
          'bg-[url(/images/bg-sign-in.png)] bg-repeat',
          'flex flex-col justify-center items-center min-h-screen h-full m-0',
        )}
      >
        {children}
      </div>
    </QueryClientProvider>
  );
};

export default AuthLayout;
