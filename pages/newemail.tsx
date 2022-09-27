import type { NextPage } from 'next';
import Head from 'next/head';

import usePage from '@lib/hooks/usePage';
import ConfirmNewEmailForm from '@components/forms/auth/ConfirmNewEmailForm';

const NewEmail: NextPage = () => {
  const page = usePage();

  return (
    <>
      <Head>
        <title>Confirm new email link</title>
        <meta name="description" content="Confirm new email link" />
      </Head>

      <ConfirmNewEmailForm />
    </>
  );
};

export default NewEmail;
