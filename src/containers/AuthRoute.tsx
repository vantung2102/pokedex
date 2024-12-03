'use client';

import { shallow } from 'zustand';
import { useAuth } from '@/hooks';
import { useRouter, usePathname } from 'next/navigation';
import { PRIVATE_PATH } from '@/constants/routes';

export function AuthRoute({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const { isAuthenticated } = useAuth();

  if (!isAuthenticated && PRIVATE_PATH.includes(pathname)) {
    router.push('/sign-in');
  }

  return children;
}
