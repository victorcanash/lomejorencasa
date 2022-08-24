import type { NextPage } from 'next';
import Head from 'next/head';

import usePage from '@lib/hooks/usePage';
import { ProductProps, getProductProps } from '@lib/server/product';
import ProductDetail from '@components/product/ProductDetail';

const Product: NextPage<ProductProps> = (props) => {
  const { product } = props;

  const page = usePage();

  return (
    <>
      <Head>
        <title>Search</title>
        <meta name="description" content="Product page" />
      </Head>

      <ProductDetail product={product} />
    </>
  );
}

export default Product;

export const getServerSideProps = getProductProps;
