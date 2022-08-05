import type { NextPage } from 'next';
import Head from "next/head";

import useLogoutPage from '@lib/hooks/useLogoutPage';

const Logout: NextPage = () => {
  const logoutPage = useLogoutPage();

  return (
    <>
      <Head>
        <title>Logout</title>
        <meta name="description" content="Logout page" />
      </Head>
    </>
  )
};

export default Logout;
