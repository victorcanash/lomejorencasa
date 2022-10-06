import type { GetServerSideProps } from 'next';

import type { Product } from '@core/types/products';
import { getProduct } from '@core/utils/products';

export type ProductProps = {
  product: Product,
};

export const getProductProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const idSearch = typeof id == 'string' && parseInt(id) >= 0 ? parseInt(id) : -1;

  let result: { props: ProductProps } | { notFound: boolean } = { props: {} as ProductProps };
  
  await getProduct(idSearch, false)
    .then((response: { product: Product }) => {
      result = {
        props: {
          product: response.product
        }
      }
    })
    .catch((error: Error) => {
      result = {
        notFound: true
      }
    })

  return result;
};
