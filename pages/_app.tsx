import '@/styles/globals.css'
// import type { AppProps } from 'next/app'
import React, { useState } from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import type { AppProps } from 'next/app';
import { fetchFn } from '.';
import useSWR from 'swr'

const App = ({ Component, pageProps } : AppProps) => {
  //pre-cache?
  const { data, error, isLoading } = useSWR('https://jsonplaceholder.typicode.com/albums', fetchFn)
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default App