'use client';

import React from 'react';
import clsx from 'clsx';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={clsx(
        'bg-[url(/images/bg-sign-in.png)] bg-repeat',
        'flex flex-col justify-center items-center min-h-screen h-full m-0',
      )}
    >
      {children}
    </div>
  );
};

export default AuthLayout;
