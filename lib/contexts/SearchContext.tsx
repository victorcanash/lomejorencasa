import { createContext, useState, Dispatch, SetStateAction, useContext } from 'react';

import { pages } from '@lib/constants/navigation';
import { allProductsName } from '@core/constants/products';
import type { ProductCategory } from '@core/types/products';
import { AdminSections } from '@core/constants/admin';

type SearchContext = {
  productCategories: ProductCategory[],
  setProductCategories: Dispatch<SetStateAction<ProductCategory[]>>,
  sortBy: string,
  setSortBy: Dispatch<SetStateAction<string>>,
  order: string,
  setOrder: Dispatch<SetStateAction<string>>,
  getHref: (categoryName?: string, page?: number, keywords?: string, admin?: boolean) => string,
};

const SearchContext = createContext<SearchContext>({
  productCategories: [],
  setProductCategories: () => {},
  sortBy: 'id',
  setSortBy: () => {},
  order: 'asc',
  setOrder: () => {},
  getHref: () => '',
});

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('Error while reading SearchContext');
  }

  return context;
};

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
  const [sortBy, setSortBy] = useState('id');
  const [order, setOrder] = useState('asc');

  const getHref = (categoryName = allProductsName, page = 1, keywords = '', admin = false) => {
    const pagePath = !admin ? `${pages.productList.path}/${categoryName}` : pages.admin.path;
    let queries = `?page=${page}&sortBy=${sortBy}&order=${order}&keywords=${keywords}`;
    if (admin) {
      queries += `&section=${AdminSections.checkProducts}`;
    }
    return `${pagePath}${queries}`;
  };

  return (
    <SearchContext.Provider
      value={{
        productCategories,
        setProductCategories,
        sortBy,
        setSortBy,
        order,
        setOrder,
        getHref,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
