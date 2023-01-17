import type { NextPage } from 'next';
import Head from 'next/head';

import { useIntl } from 'react-intl';
import usePage from '@lib/hooks/usePage';
import EverfreshHome from '@components/products/everfresh/EverfreshHome';

const Home: NextPage = () => {
  const intl = useIntl();

  const page = usePage();

  const title = intl.formatMessage({ id: 'home.metas.title' });
  const description = intl.formatMessage({ id: 'home.metas.description' });

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <EverfreshHome />
    </>
  );
};

export default Home;
