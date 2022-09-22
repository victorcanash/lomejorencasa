import { useState } from 'react';
import type { NextPage } from 'next';
import Head from "next/head";

import usePage from '@lib/hooks/usePage';
import RegisterForm from '@components/forms/auth/RegisterForm';
import ActivateAccount from '@components/ActivateAccount';

const Register: NextPage = () => { 
  const page = usePage();

  const [email, setEmail] = useState<string | undefined>(undefined)

  const onRegisterSuccess = (email: string) => {
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
          <ActivateAccount email={email} />
      }
    </>
  )
};

export default Register;
