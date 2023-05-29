import type { GetServerSideProps } from 'next';

import { allProductsName } from '@core/constants/products';
import type { Product, ProductCategory } from '@core/types/products';
import { getAllProducts } from '@core/utils/products';

import searchConfig from '@lib/config/search.config';

export type CollectionProps = {
  products: Product[],
  currentPage: number,
  totalPages: number, 
  productCategory: ProductCategory | null,
  keywords: string,
};

export const getCollectionProps: GetServerSideProps = async (context) => {
  const categoryParam = context.params?.category;
  const { page, sortBy, order, keywords } = context.query;
  const categorySearch = typeof categoryParam == 'string' ? categoryParam : allProductsName;
  const pageSearch = typeof page == 'string' && parseInt(page) > 0 ? parseInt(page) : 1;
  const sortBySearch = typeof sortBy == 'string' ? sortBy : 'id';
  const orderSearch = typeof order == 'string' ? order : 'asc';
  const keywordsSearch = typeof keywords == 'string' ? keywords : '';

  let result: { props: CollectionProps } | { notFound: boolean } = { props: {} as CollectionProps };
  
  await getAllProducts('', context.locale || '', pageSearch, searchConfig.limitByPage, sortBySearch, orderSearch, keywordsSearch, categorySearch, searchConfig.orderRemains)
    .then((response: { products: Product[], productCategory: ProductCategory | null, totalPages: number, currentPage: number }) => {
      result = {
        props: {
          products: response.products,
          productCategory: response.productCategory,
          currentPage: response.currentPage,
          totalPages: response.totalPages,
          keywords: keywordsSearch
        }
      };
    })
    .catch((_error: Error) => {
      result = { 
        notFound: true 
      };
    });

  return result;
};
