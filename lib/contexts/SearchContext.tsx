import { createContext, useState, Dispatch, SetStateAction, useContext } from 'react';

import { pages } from '@core/config/navigation.config';
import { allProductsName } from '@core/constants/products';
import type { ProductCategory } from '@core/types/products';

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
    const routerPath = !admin ? pages.productList.path : pages.admin.path;
    return `${routerPath}/${categoryName}?page=${page}&sortBy=${sortBy}&order=${order}&keywords=${keywords}`;
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
