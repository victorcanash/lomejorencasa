import { createContext, useState, Dispatch, SetStateAction, useContext } from 'react';

type SearchContext = {
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
  order: string;
  setOrder: Dispatch<SetStateAction<string>>;
  keywords: string; 
  setKeywords: Dispatch<SetStateAction<string>>;
  getHref: (categoryName?: string, page?: number) => string;
};

const SearchContext = createContext<SearchContext>({
  sortBy: 'id',
  setSortBy: () => {},
  order: 'asc',
  setOrder: () => {},
  keywords: '',
  setKeywords: () => {},
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
  const [sortBy, setSortBy] = useState<string>('id');
  const [order, setOrder] = useState<string>('asc');
  const [keywords, setKeywords] = useState<string>('');

  const getHref = (categoryName: string = 'all', page: number = 1) => {
    return `/collections/${categoryName}?page=${page}&sortBy=${sortBy}&order=${order}&keywords=${keywords}`;
  }

  return (
    <SearchContext.Provider
      value={{
        sortBy,
        setSortBy,
        order,
        setOrder,
        keywords,
        setKeywords,
        getHref,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
