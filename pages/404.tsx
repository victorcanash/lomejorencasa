import type { NextPage } from 'next';
import Head from 'next/head';

import { useIntl } from 'react-intl';

import usePage from '@lib/hooks/usePage';
import ErrorPage from '@components/exceptions/ErrorPage';

const NotFound: NextPage = () => {
  const intl = useIntl();

  const page = usePage();

  const title = intl.formatMessage({ id: 'notfound.metas.title' });
  const description = intl.formatMessage({ id: 'notfound.metas.description' });
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <ErrorPage title={intl.formatMessage({ id: 'notfound.h1' })} />
    </>
  );
};

export default NotFound;
