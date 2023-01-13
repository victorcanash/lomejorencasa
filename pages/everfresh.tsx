import type { NextPage } from 'next';
import Head from 'next/head';

import { useIntl } from 'react-intl';

import { EverfreshProps, getEverfreshProps } from '@lib/server/everfresh';
import usePage from '@lib/hooks/usePage';
import ProductDetail from '@components/products/ProductDetail';

const Everfresh: NextPage<EverfreshProps> = (props) => {
  const { product } = props;

  const intl = useIntl();

  const page = usePage();

  const title = intl.formatMessage({ id: 'everfresh.metas.title' });
  const description = intl.formatMessage({ id: 'everfresh.metas.description' });

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <ProductDetail product={product} />
    </>
  );
}

export default Everfresh;

export const getServerSideProps = getEverfreshProps;
