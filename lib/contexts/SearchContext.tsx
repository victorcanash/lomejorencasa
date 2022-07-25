import React from 'react';
import { createContext, useState, Dispatch, SetStateAction, useContext, useEffect } from 'react';

import type { Product } from '@core/types';

type SearchContext = {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  currentPage: number; 
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPages: number; 
  setTotalPages: Dispatch<SetStateAction<number>>;
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
  order: string;
  setOrder: Dispatch<SetStateAction<string>>;
  keywords: string; 
  setKeywords: Dispatch<SetStateAction<string>>;
  categoryId: number;
  setCategoryId: Dispatch<SetStateAction<number>>;
};

const SearchContext = createContext<SearchContext>({
  products: [],
  setProducts: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  totalPages: 1,
  setTotalPages: () => {},
  sortBy: 'id',
  setSortBy: () => {},
  order: 'asc',
  setOrder: () => {},
  keywords: '',
  setKeywords: () => {},
  categoryId: -1,
  setCategoryId: () => {},
});

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('Error while reading search context');
  }

  return context;
};

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>('id');
  const [order, setOrder] = useState<string>('asc');
  const [keywords, setKeywords] = useState<string>('');
  const [categoryId, setCategoryId] = useState<number>(-1);

  return (
    <SearchContext.Provider
      value={{
        products,
        setProducts,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        sortBy,
        setSortBy,
        order,
        setOrder,
        keywords,
        setKeywords,
        categoryId,
        setCategoryId
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
