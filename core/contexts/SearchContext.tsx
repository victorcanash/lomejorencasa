import {
  createContext,
  useCallback,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';

import { AdminSections } from '@core/constants/admin';
import { allProductsName } from '@core/constants/products';
import type { ProductCategory } from '@core/types/products';

import { pages } from '@lib/config/navigation.config';

type SearchContext = {
  productCategories: ProductCategory[],
  setProductCategories: Dispatch<SetStateAction<ProductCategory[]>>,
  sortBy: string,
  setSortBy: Dispatch<SetStateAction<string>>,
  order: string,
  setOrder: Dispatch<SetStateAction<string>>,
  getHref: (categoryName?: string, page?: number, keywords?: string, admin?: boolean) => string,
  getPacksHref: (page?: number) => string,
};

const SearchContext = createContext<SearchContext>({
  productCategories: [],
  setProductCategories: () => {},
  sortBy: 'id',
  setSortBy: () => {},
  order: 'asc',
  setOrder: () => {},
  getHref: () => '',
  getPacksHref: () => '',
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

  const getHref = useCallback((categoryName = allProductsName, page = 1, keywords = '', admin = false) => {
    const pagePath = !admin ? `${pages.productList.path}/${categoryName}` : pages.admin.path;
    let queries = `?page=${page}&sortBy=${sortBy}&order=${order}&keywords=${keywords}`;
    if (admin) {
      queries += `&section=${AdminSections.checkProducts}`;
    }
    return `${pagePath}${queries}`;
  }, [order, sortBy]);

  const getPacksHref = useCallback((page = 1) => {
    const pagePath = pages.admin.path;
    let queries = `?page=${page}&sortBy=${sortBy}&order=${order}`;
    queries += `&section=${AdminSections.checkProductPacks}`;
    return `${pagePath}${queries}`;
  }, [order, sortBy]);

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
        getPacksHref,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
