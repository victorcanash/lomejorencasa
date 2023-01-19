import type { GetServerSideProps } from 'next';

import { bagProductId } from '@core/constants/products';
import type { Product } from '@core/types/products';
import { getProduct } from '@core/utils/products';

export type BagProps = {
  product: Product,
};

export const getBagProps: GetServerSideProps = async (context) => {
  let result: { props: BagProps } | { notFound: boolean } = { props: {} as BagProps };
  
  await getProduct('', context.locale || '', bagProductId)
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
    });

  return result;
};