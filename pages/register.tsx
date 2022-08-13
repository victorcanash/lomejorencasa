import type { NextPage } from 'next';
import Head from "next/head";

import { getPageProps, PageProps } from '@lib/server/page';
import usePage from '@lib/hooks/usePage';
import RegisterForm from '@components/forms/RegisterForm';

const Register: NextPage<PageProps> = (props) => { 
  const page = usePage(props);

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

export const getServerSideProps = getPageProps;
