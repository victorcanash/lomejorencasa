import type { NextPage } from 'next';
import Head from 'next/head';

import usePage from '@lib/hooks/usePage';
import ForgotForm from '@components/forms/auth/ForgotForm';

const Forgot: NextPage = () => { 
  const page = usePage();

  return (
    <>
      <Head>
        <title>Forgot password</title>
        <meta name="description" content="Forgot password page" />
      </Head>
      
      <ForgotForm forgotPage={true} />
    </>
  )
};

export default Forgot;
