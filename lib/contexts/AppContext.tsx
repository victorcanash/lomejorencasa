import { createContext, Dispatch, SetStateAction, useContext, useState, useRef, useEffect } from 'react';

import type { User } from '@core/types'
import { getCredentials } from '@core/utils/auth';

type ContextType = {
  initialized: boolean;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  user?: User;
  setUser: Dispatch<SetStateAction<User | undefined>>;
};

export const AppContext = createContext<ContextType>({
  initialized: false,
  loading: true,
  setLoading: () => {},
  token: '',
  setToken: () => {},
  user: undefined,
  setUser: () => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('Error while reading main context');
  }

  return context;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const firstRenderRef = useRef(false);

  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (!firstRenderRef.current) {
      firstRenderRef.current = true; 
      getCredentials().then((response: {token: string, user: User}) => {
        setToken(response.token);
        setUser(response.user);
        setInitialized(true);
      }).catch((error: Error) => {
        setInitialized(true);
      });   
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
        setUser 
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
