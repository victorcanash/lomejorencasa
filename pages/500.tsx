import type { NextPage } from 'next';
import Head from 'next/head';

import { useIntl } from 'react-intl';

import usePage from '@lib/hooks/usePage';
import ErrorUI from '@components/exceptions/ErrorPage';

const Error: NextPage = () => {
  const intl = useIntl();

  const page = usePage();

  const title = intl.formatMessage({ id: 'error.metas.title' });
  const description = intl.formatMessage({ id: 'error.metas.description' });
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <ErrorUI title={intl.formatMessage({ id: 'error.h1' })} />
    </>
  );
};

export default Error;
