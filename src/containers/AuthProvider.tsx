'use client';

import React from 'react';
import { useAuth } from 'hooks';
import { useRouter, usePathname } from 'next/navigation';

import { SIGN_IN_PATH, PRIVATE_PATH } from 'constants/routes';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (!isAuthenticated && PRIVATE_PATH.includes(pathname)) {
      router.push(SIGN_IN_PATH);
    }
  }, [pathname, router]);

  return children;
}
