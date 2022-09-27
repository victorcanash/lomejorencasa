import { createContext, useState, Dispatch, SetStateAction, useContext } from 'react';

import { RouterPaths } from '@core/constants/navigation';
import { allProductsName } from '@core/constants/products';
import type { ProductCategory } from '@core/types/products';

type SearchContext = {
  categories: ProductCategory[],
  sortBy: string,
  setSortBy: Dispatch<SetStateAction<string>>,
  order: string,
  setOrder: Dispatch<SetStateAction<string>>,
  getHref: (categoryName?: string, page?: number, keywords?: string, admin?: boolean) => string,
  initSearch: (productCategories: ProductCategory[]) => void,
};

const SearchContext = createContext<SearchContext>({
  categories: [],
  sortBy: 'id',
  setSortBy: () => {},
  order: 'asc',
  setOrder: () => {},
  getHref: () => '',
  initSearch: () => {},
});

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('Error while reading SearchContext');
  }

  return context;
};

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [sortBy, setSortBy] = useState('id');
  const [order, setOrder] = useState('asc');

  const initSearch = (productCategories: ProductCategory[]) => {
    setCategories(productCategories);
  }

  const getHref = (categoryName = allProductsName, page = 1, keywords = '', admin = false) => {
    const routerPath = !admin ? RouterPaths.productList : RouterPaths.admin;
    return `${routerPath}/${categoryName}?page=${page}&sortBy=${sortBy}&order=${order}&keywords=${keywords}`;
  };

  return (
    <SearchContext.Provider
      value={{
        categories,
        sortBy,
        setSortBy,
        order,
        setOrder,
        getHref,
        initSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
