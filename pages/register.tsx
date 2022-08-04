import type { NextPage } from 'next';
import Head from "next/head";

import usePage from '@lib/hooks/usePage';
import RegisterForm from '@components/forms/RegisterForm';

const Register: NextPage = () => { 
  const page = usePage();

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Register page" />
      </Head>
      
      <RegisterForm />
    </>
  )
};

export default Register;
