import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { useIntl } from 'react-intl';

import usePage from '@lib/hooks/usePage';
import LoginForm from '@components/forms/auth/LoginForm';
import ResendActivationForm from '@components/forms/auth/ResendActivationForm';

const Login: NextPage = () => { 
  const intl = useIntl();

  const page = usePage();

  const title = intl.formatMessage({ id: 'login.metas.title' });
  const description = intl.formatMessage({ id: 'login.metas.description' });

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
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      
      {
        !email ?
          <LoginForm onFailByActivation={onLoginFailByActivation} />
          :
          <ResendActivationForm email={email} onClickProceedBtn={onClickProceedBtn} />
      }
    </>
  )
};

export default Login;
