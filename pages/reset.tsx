import type { NextPage } from 'next';
import Head from 'next/head';

import usePage from '@lib/hooks/usePage';
import ResetPswForm from '@components/forms/auth/ResetPswForm';

const Reset: NextPage = () => {
  const page = usePage();

  return (
    <>
      <Head>
        <title>Password reset link</title>
        <meta name="description" content="Password reset link" />
      </Head>

      <ResetPswForm />
    </>
  );
};

export default Reset;
