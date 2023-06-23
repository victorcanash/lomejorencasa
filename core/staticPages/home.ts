import type { GetStaticProps } from 'next';

import type { Landing, ProductCategory, ProductCategoryGroup } from '@core/types/products';
import { getAllProductCategories, getProductCategory } from '@core/utils/products';

export type HomePageProps = {
  categoryGroups: ProductCategoryGroup[],
  categoryFeatured: ProductCategory,
  landingsFeatured: Landing[],
};

export const getHomeStaticProps: GetStaticProps = async () => {
  let categoryGroups: ProductCategoryGroup[] = [];
  await getAllProductCategories(true)
    .then((response) => {
      categoryGroups = response.productCategories;
    })
    .catch((error) => {
    });

  let categoryFeatured: ProductCategory = {} as ProductCategory;
  let landingsFeatured: Landing[] = [];
  await getProductCategory('productos-destacados')
    .then((response) => {
      categoryFeatured = response.productCategory;
      landingsFeatured = response.landingsResult.landings;
    })
    .catch((error) => {
    });

  return {
    props: {
      categoryGroups: categoryGroups,
      categoryFeatured: categoryFeatured,
      landingsFeatured: landingsFeatured,
    } as HomePageProps,
  };
};
