import type { NextPage } from 'next';
import Head from 'next/head';

import { useIntl } from 'react-intl';

import { ProductProps, getProductProps } from '@lib/server/product';
import usePage from '@lib/hooks/usePage';
import ProductDetail from '@components/products/ProductDetail';

const Product: NextPage<ProductProps> = (props) => {
  const { product } = props;

  const intl = useIntl();

  const page = usePage();

  // const title = intl.formatMessage({ id: 'productDetail.metas.title' });
  const description = intl.formatMessage({ id: 'productDetail.metas.description' });

  return (
    <>
      <Head>
        <title>{product.name.current}</title>
        <meta name="description" content={description} />
      </Head>

      <ProductDetail product={product} />
    </>
  );
}

export default Product;

export const getServerSideProps = getProductProps;
