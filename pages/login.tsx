import type { NextPage } from 'next';
import Head from 'next/head';

import usePage from '@lib/hooks/usePage';
import LoginForm from '@components/forms/auth/LoginForm';

const Login: NextPage = () => { 
  const page = usePage();

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login page" />
      </Head>
      
      <LoginForm />
    </>
  )
};

export default Login;
