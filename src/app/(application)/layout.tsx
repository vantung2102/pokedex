'use client';

import React from 'react';
import clsx from 'clsx';

import { Navbar } from 'components';

const ApplicationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />

      {children}
    </div>
  );
};

export default ApplicationLayout;
