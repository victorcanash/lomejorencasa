import { createContext, useState, Dispatch, SetStateAction, useContext } from 'react';

import { RouterPaths } from '@core/constants/navigation';
import { allProductsName } from '@core/constants/products';

type SearchContext = {
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
  order: string;
  setOrder: Dispatch<SetStateAction<string>>;
  getHref: (categoryName?: string, page?: number) => string;
};

const SearchContext = createContext<SearchContext>({
  sortBy: 'id',
  setSortBy: () => {},
  order: 'asc',
  setOrder: () => {},
  getHref: () => '',
});

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('Error while reading search context');
  }

  return context;
};

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [sortBy, setSortBy] = useState('id');
  const [order, setOrder] = useState('asc');

  const getHref = (categoryName = allProductsName, page = 1, keywords = '') => {
    return `${RouterPaths.productList}/${categoryName}?page=${page}&sortBy=${sortBy}&order=${order}&keywords=${keywords}`;
  };

  return (
    <SearchContext.Provider
      value={{
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
