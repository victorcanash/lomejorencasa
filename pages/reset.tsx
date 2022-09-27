import type { NextPage } from 'next';
import Head from 'next/head';

import Container from '@mui/material/Container';

import usePage from '@lib/hooks/usePage';
import ResetPasswordForm from '@components/forms/auth/ResetPasswordForm';

const Reset: NextPage = () => {
  const page = usePage();

  return (
    <>
      <Head>
        <title>Password reset</title>
        <meta name="description" content="Reset page" />
      </Head>

      <Container 
        maxWidth={false}
        className="noLayoutPage"
      >
        <ResetPasswordForm />
      </Container>
    </>
  );
};

export default Reset;
