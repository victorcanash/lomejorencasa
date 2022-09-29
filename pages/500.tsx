import type { NextPage } from 'next';
import Head from 'next/head';

import usePage from '@lib/hooks/usePage';
import ErrorUI from '@components/ui/ErrorPage';

const Error: NextPage = () => {
  const page = usePage();
  
  return (
    <>
      <Head>
        <title>Error</title>
        <meta name="description" content="Error page" />
      </Head>

      <ErrorUI title='An error has ocurred' />
    </>
  );
};

export default Error;
