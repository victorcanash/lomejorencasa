import type { GetServerSideProps } from 'next';

import type { Product, ProductCategory } from '@core/types/products';
import { getAllProducts } from '@core/utils/products';

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
  const categorySearch = typeof categoryParam == 'string' ? categoryParam : 'all';
  const pageSearch = typeof page == 'string' && parseInt(page) > 0 ? parseInt(page) : 1;
  const sortBySearch = typeof sortBy == 'string' ? sortBy : 'id';
  const orderSearch = typeof order == 'string' ? order : 'asc';
  const keywordsSearch = typeof keywords == 'string' ? keywords : '';

  let result: { props: CollectionProps } | { notFound: boolean } = { props: {} as CollectionProps };
  
  await getAllProducts(pageSearch, sortBySearch, orderSearch, keywordsSearch, categorySearch)
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
    .catch((error: Error) => {
      result = { 
        notFound: true 
      };
    })

  return result;
};
