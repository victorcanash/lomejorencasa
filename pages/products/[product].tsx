import type { NextPage } from 'next';
import Head from 'next/head';

import { composeProps } from "next-compose-props";

import { getPageProps, PageProps } from '@lib/server/page';
import usePage from '@lib/hooks/usePage';
import { ProductProps, getProductProps } from '@lib/server/product';
import ProductDetail from '@components/product/ProductDetail';

const Product: NextPage<PageProps & ProductProps> = (props) => {
  const { token, user, categories, product } = props;

  const page = usePage({ token, user, categories });

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

export const getServerSideProps = composeProps(getPageProps, getProductProps);
