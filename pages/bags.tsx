import type { NextPage } from 'next';
import Head from 'next/head';

import { useIntl } from 'react-intl';

import { BagProps, getBagProps } from '@lib/server/bag';
import usePage from '@lib/hooks/usePage';
import ProductDetail from '@components/products/ProductDetail';

const Bags: NextPage<BagProps> = (props) => {
  const { product } = props;

  const intl = useIntl();

  const page = usePage();

  const title = intl.formatMessage({ id: 'bags.metas.title' });
  const description = intl.formatMessage({ id: 'bags.metas.description' });

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

export default Bags;

export const getServerSideProps = getBagProps;
