import type { NextPage } from 'next';
import Head from 'next/head';

import Container from '@mui/material/Container';

import usePage from '@lib/hooks/usePage';
import ConfirmNewEmailForm from '@components/forms/auth/ConfirmNewEmailForm';

const NewEmail: NextPage = () => {
  const page = usePage();

  return (
    <>
      <Head>
        <title>Confirm new email</title>
        <meta name="description" content="Confirm new email page" />
      </Head>

      <Container 
        maxWidth={false}
        className="noLayoutPage"
      >
        <ConfirmNewEmailForm />
      </Container>
    </>
  );
};

export default NewEmail;
