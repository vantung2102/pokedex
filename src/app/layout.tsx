import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

import { Toaster } from 'react-hot-toast';
import { NextUIProvider } from '@nextui-org/react';
import { AuthProvider, ReactQueryProvider } from 'containers';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'PokeDex',
  description: 'A simple PokeDex app',
  icons: [
    {
      url: '/images/pokeball.png',
      href: '/images/pokeball.png',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden m-0 p-0`}>
        <ReactQueryProvider>
          <AuthProvider>
            <Toaster />
            <NextUIProvider>{children}</NextUIProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
