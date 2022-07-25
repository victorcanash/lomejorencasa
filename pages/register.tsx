import type { NextPage } from 'next';
import Head from "next/head";

import { RegisterForm } from '@components/forms/RegisterForm';

const Register: NextPage = () => { 
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
