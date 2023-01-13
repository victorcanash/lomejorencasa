import type { GetServerSideProps } from 'next';

import { everfreshProductId } from '@core/constants/products';
import type { Product } from '@core/types/products';
import { getProduct } from '@core/utils/products';

export type EverfreshProps = {
  product: Product,
};

export const getEverfreshProps: GetServerSideProps = async (context) => {
  let result: { props: EverfreshProps } | { notFound: boolean } = { props: {} as EverfreshProps };
  
  await getProduct('', context.locale || '', everfreshProductId)
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
