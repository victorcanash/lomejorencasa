import type { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';

import type { Landing, ProductCategory, ProductCategoryGroup } from '@core/types/products';
import { getAllProductCategories, getProductCategory } from '@core/utils/products';

export type CategoryPageProps = {
  category: ProductCategory,
  landings: Landing[],
};

interface ICategoryPageParams extends ParsedUrlQuery {
  category: string,
};

export const getCategoryStaticPaths: GetStaticPaths = async () => {
  let categoriesGroups: ProductCategoryGroup[] = [];
  let categories: ProductCategory[] = [];
  await getAllProductCategories(true)
    .then((response) => {
      categoriesGroups = response.productCategories;
    })
    .catch((error) => {
    });
  await getAllProductCategories()
    .then((response) => {
      categories = response.productCategories;
    })
    .catch((error) => {
    });

  const allCategories: (ProductCategoryGroup | ProductCategory)[] = categoriesGroups.concat(categories);
  const paths = allCategories.map((category) => {
    return {
      params: {
        category: category.slug,
      } as ICategoryPageParams,
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getCategoryStaticProps: GetStaticProps = async (context) => {
  const { category: slug } = context.params as ICategoryPageParams;

  let category: ProductCategory = {} as ProductCategory;
  let landings: Landing[] = [];
  await getProductCategory(slug)
    .then((response) => {
      category = response.productCategory;
      landings = response.landingsResult.landings;
    })
    .catch((error) => {
    });

  return {
    props: {
      category: category,
      landings: landings,
    } as CategoryPageProps,
  };
};
