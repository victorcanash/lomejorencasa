import React, { useRef, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from "next/head";
import { useRouter } from 'next/router';

// import { useAppContext } from '@lib/contexts/AppContext';

const NotFound: NextPage = () => {
  const firstRenderRef = useRef(false);

  // const { setLoading } = useAppContext();

  const router = useRouter();

  const goToPage = (to: string) => {
    router.push(to);
  };

  useEffect(() => {
    if (!firstRenderRef.current) {
      firstRenderRef.current = true;
      goToPage('/');
      // setLoading(false);
    }    
  });
  
  return (
    <>
      <Head>
        <title>Not Found</title>
        <meta name="description" content="Not found page" />
      </Head>
    </>
  );
};

export default NotFound;
