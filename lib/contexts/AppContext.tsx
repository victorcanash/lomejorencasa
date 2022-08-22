import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

import type { User } from '@core/types/auth';
import type { ProductCategory } from '@core/types/products';

type ContextType = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  user?: User;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  categories: ProductCategory[];
  setCategories: Dispatch<SetStateAction<ProductCategory[]>>;
};

export const AppContext = createContext<ContextType>({
  loading: true,
  setLoading: () => {},
  token: '',
  setToken: () => {},
  user: undefined,
  setUser: () => {},
  categories: [],
  setCategories: () => {}
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('Error while reading app context');
  }

  return context;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [user, setUser] = useState<User | undefined>(undefined);
  const [categories, setCategories] = useState<ProductCategory[]>([]);

  return (
    <AppContext.Provider
      value={{ 
        loading, 
        setLoading, 
        token, 
        setToken, 
        user, 
        setUser,
        categories,
        setCategories
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
