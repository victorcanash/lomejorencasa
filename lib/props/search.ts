import type { GetServerSideProps } from 'next';

import type { Product } from '@core/types/products';
import { getAllProducts } from '@core/utils/products';

export interface SearchProps {
  products: Product[]; 
  currentPage: number;
  totalPages: number; 
  categoryName: string;
  sortBy: string; 
  order: string;
  keywords: string;
}

export const getSearchProps: GetServerSideProps = async (context) => {
  const { page, sortBy, order, keywords, category } = context.query;
  const pageSearch = typeof page == 'string' && parseInt(page) > 0 ? parseInt(page) : 1;
  const sortBySearch = typeof sortBy == 'string' ? sortBy : 'id';
  const orderSearch = typeof order == 'string' ? order : 'asc';
  const keywordsSearch = typeof keywords == 'string' ? keywords : '';
  const categorySearch = typeof category == 'string' ? category : 'all';

  let result: { props: SearchProps } | { notFound: boolean } = { props: {} as SearchProps };
  
  await getAllProducts(pageSearch, sortBySearch, orderSearch, keywordsSearch, categorySearch)
    .then((response: { products: Product[]; totalPages: number; currentPage: number }) => {
      result = {
        props: {
          products: response.products,
          currentPage: response.currentPage,
          totalPages: response.totalPages,
          categoryName: categorySearch,
          sortBy: sortBySearch,
          order: orderSearch,
          keywords: keywordsSearch
        }
      };
    })
    .catch((error: Error) => {
      result = { 
        notFound: true 
      };
    })

  return result
};
