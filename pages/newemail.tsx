import type { NextPage } from 'next';
import Head from 'next/head';

import { useIntl } from 'react-intl';

import usePage from '@lib/hooks/usePage';
import ConfirmNewEmailForm from '@components/forms/auth/ConfirmNewEmailForm';

const NewEmail: NextPage = () => {
  const intl = useIntl();

  const page = usePage();

  const title = intl.formatMessage({ id: 'newemail.metas.title' });
  const description = intl.formatMessage({ id: 'newemail.metas.description' });

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <ConfirmNewEmailForm />
    </>
  );
};

export default NewEmail;
