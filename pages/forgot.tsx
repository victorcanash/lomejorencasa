import type { NextPage } from 'next';
import Head from 'next/head';

import usePage from '@lib/hooks/usePage';
import ForgotPswForm from '@components/forms/auth/ForgotPswForm';

const Forgot: NextPage = () => { 
  const page = usePage();

  return (
    <>
      <Head>
        <title>Forgot password</title>
        <meta name="description" content="Forgot password page" />
      </Head>
      
      <ForgotPswForm />
    </>
  )
};

export default Forgot;
