import { createContext, Dispatch, SetStateAction, useContext, useState, useRef, useEffect } from 'react';

import type { User, ProductCategory } from '@core/types'
import { getCredentials } from '@core/utils/auth';
import { getAllProductCategories } from '@core/utils/products';

type ContextType = {
  initialized: boolean;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  user?: User;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  categories: ProductCategory[];
};

export const AppContext = createContext<ContextType>({
  initialized: false,
  loading: true,
  setLoading: () => {},
  token: '',
  setToken: () => {},
  user: undefined,
  setUser: () => {},
  categories: [],
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('Error while reading app context');
  }

  return context;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const firstRenderRef = useRef(false);

  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const [user, setUser] = useState<User | undefined>(undefined);
  const [categories, setCategories] = useState<ProductCategory[]>([]);

  useEffect(() => {
    if (!firstRenderRef.current) {
      firstRenderRef.current = true; 

      const initData = async() => {
        await getCredentials().then((response: {token: string, user: User}) => {
          setToken(response.token);
          setUser(response.user);
        }).catch((error: Error) => {
        }); 

        await getAllProductCategories().then((response: {productCategories: ProductCategory[]}) => {
          setCategories(response.productCategories);
          setInitialized(true);
        }).catch((error: Error) => {
          setTimeout(() => {
            initData();
          }, 3000);
        });
      };  

      initData();
    }    
  }, []);

  return (
    <AppContext.Provider
      value={{ 
        initialized,
        loading, 
        setLoading, 
        token, 
        setToken, 
        user, 
        setUser,
        categories
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
