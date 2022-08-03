import { createContext, useState, Dispatch, SetStateAction, useContext } from 'react';

type SearchContext = {
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
  order: string;
  setOrder: Dispatch<SetStateAction<string>>;
  keywords: string; 
  setKeywords: Dispatch<SetStateAction<string>>;
};

const SearchContext = createContext<SearchContext>({
  sortBy: 'id',
  setSortBy: () => {},
  order: 'asc',
  setOrder: () => {},
  keywords: '',
  setKeywords: () => {},
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

  return (
    <SearchContext.Provider
      value={{
        sortBy,
        setSortBy,
        order,
        setOrder,
        keywords,
        setKeywords,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
