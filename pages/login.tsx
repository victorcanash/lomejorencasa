import type { NextPage } from 'next';
import Head from "next/head";

import { LoginForm } from '@components/forms/LoginForm';

const Login: NextPage = () => { 
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
