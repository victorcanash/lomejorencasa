import type { NextPage } from 'next';
import Head from "next/head";

import usePage from '@lib/hooks/usePage';
import ErrorPage from '@components/ui/ErrorPage';

const NotFound: NextPage = () => {
  const page = usePage();
  
  return (
    <>
      <Head>
        <title>Not Found</title>
        <meta name="description" content="Not found page" />
      </Head>

      <ErrorPage title='Not found page' />
    </>
  );
};

export default NotFound;
