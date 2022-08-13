import type { NextPage } from 'next';
import Head from 'next/head';

import { getPageProps, PageProps } from '@lib/server/page';
import usePage from '@lib/hooks/usePage';
import LoginForm from '@components/forms/LoginForm';

const Login: NextPage<PageProps> = (props) => { 
  const page = usePage(props);

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

export const getServerSideProps = getPageProps;
