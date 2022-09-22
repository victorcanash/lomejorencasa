import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import usePage from '@lib/hooks/usePage';
import LoginForm from '@components/forms/auth/LoginForm';
import ActivateAccount from '@components/ActivateAccount';

const Login: NextPage = () => { 
  const page = usePage();

  const [email, setEmail] = useState<string | undefined>(undefined)

  const onLoginFailByActivation = (email: string) => {
    window.scrollTo(0, 0);
    setEmail(email);
  }

  const onClickProceedBtn = () => {
    setEmail(undefined);
  }

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login page" />
      </Head>
      
      {
        !email ?
          <LoginForm onFailByActivation={onLoginFailByActivation} />
          :
          <ActivateAccount email={email} onClickProceedBtn={onClickProceedBtn} />
      }
    </>
  )
};

export default Login;
