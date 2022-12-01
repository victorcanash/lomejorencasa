import type { NextPage } from 'next';
import Head from 'next/head';

import { useIntl } from 'react-intl';

import usePage from '@lib/hooks/usePage';
import ForgotPswForm from '@components/forms/auth/ForgotPswForm';

const Forgot: NextPage = () => { 
  const intl = useIntl();

  const page = usePage();

  const title = intl.formatMessage({ id: 'forgot.metas.title' });
  const description = intl.formatMessage({ id: 'forgot.metas.description' });

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      
      <ForgotPswForm />
    </>
  )
};

export default Forgot;
