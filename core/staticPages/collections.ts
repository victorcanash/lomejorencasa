import type { GetStaticProps } from 'next';

import type { ProductCategory } from '@core/types/products';
import { getAllProductCategories } from '@core/utils/products';

export type CollectionsPageProps = {
  categories: ProductCategory[],
};

export const getCollectionsStaticProps: GetStaticProps = async () => {
  let categories: ProductCategory[] = [];
  await getAllProductCategories()
    .then((response) => {
      categories = response.productCategories;
    })
    .catch((error) => {
      throw error;
    });

  return {
    props: {
      categories: categories,
    } as CollectionsPageProps,
  };
};
