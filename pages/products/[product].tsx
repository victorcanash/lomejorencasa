import type { NextPage } from 'next';
import Head from 'next/head';

import { ProductProps, getProductProps } from '@lib/server/product';
import usePage from '@lib/hooks/usePage';
import ProductDetail from '@components/products/ProductDetail';

const Product: NextPage<ProductProps> = (props) => {
  const { product } = props;

  const page = usePage();

  return (
    <>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content="Product page" />
      </Head>

      <ProductDetail product={product} />
    </>
  );
}

export default Product;

export const getServerSideProps = getProductProps;
