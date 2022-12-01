import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { useIntl } from 'react-intl';

import usePage from '@lib/hooks/usePage';
import RegisterForm from '@components/forms/auth/RegisterForm';
import ResendActivationForm from '@components/forms/auth/ResendActivationForm';

const Register: NextPage = () => { 
  const intl = useIntl();

  const page = usePage();

  const title = intl.formatMessage({ id: 'register.metas.title' });
  const description = intl.formatMessage({ id: 'register.metas.description' });

  const [email, setEmail] = useState<string | undefined>(undefined)

  const onRegisterSuccess = (email: string) => {
    window.scrollTo(0, 0);
    setEmail(email);
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      
      {
        !email ?
          <RegisterForm onSuccess={onRegisterSuccess} />
          :
          <ResendActivationForm email={email} />
      }
    </>
  )
};

export default Register;
