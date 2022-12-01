import type { NextPage } from 'next';
import Head from 'next/head';

import { useIntl } from 'react-intl';

import usePage from '@lib/hooks/usePage';
import ResetPswForm from '@components/forms/auth/ResetPswForm';

const Reset: NextPage = () => {
  const intl = useIntl();

  const page = usePage();

  const title = intl.formatMessage({ id: 'reset.metas.title' });
  const description = intl.formatMessage({ id: 'reset.metas.description' });

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <ResetPswForm />
    </>
  );
};

export default Reset;
