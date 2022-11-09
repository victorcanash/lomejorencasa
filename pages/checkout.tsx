import type { NextPage } from 'next';
import Head from 'next/head';

import usePage from '@lib/hooks/usePage';

const Checkout: NextPage = () => {
  const page = usePage();

  return (
    <>
      <Head>
        <title>Checkout</title>
        <meta name="description" content="Checkout page" />
      </Head>
    </>
  );
};

export default Checkout;
