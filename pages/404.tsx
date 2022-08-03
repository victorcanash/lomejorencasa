import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from "next/head";
import { useRouter } from 'next/router';

import { useAppContext } from '@lib/contexts/AppContext';

const NotFound: NextPage = () => {
  const { setLoading } = useAppContext();

  const router = useRouter();

  useEffect(() => {
    setLoading(false);  
  }, [router.asPath, setLoading]);
  
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
