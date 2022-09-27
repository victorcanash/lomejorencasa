import { useState } from 'react';
import type { NextPage } from 'next';
import Head from "next/head";

import usePage from '@lib/hooks/usePage';
import RegisterForm from '@components/forms/auth/RegisterForm';
import ResendActivationForm from '@components/forms/auth/ResendActivationForm';

const Register: NextPage = () => { 
  const page = usePage();

  const [email, setEmail] = useState<string | undefined>(undefined)

  const onRegisterSuccess = (email: string) => {
    window.scrollTo(0, 0);
    setEmail(email);
  }

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Register page" />
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
