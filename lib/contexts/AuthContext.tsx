import { createContext, useContext, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

import { RouterPaths } from '@core/constants/navigation';
import type { User } from '@core/types/user';

type ContextType = {
  token: string,
  user?: User,
  prevLoginPath: string | undefined,
  initAuth: (token: string, user: User) => void,
  removeAuth: () => void,
  isLogged: () => boolean,
  isProtectedPath: (path: string) => boolean,
};

export const AuthContext = createContext<ContextType>({
  token: '',
  user: undefined,
  prevLoginPath: undefined,
  initAuth: () => {},
  removeAuth: () => {},
  isLogged: () => false,
  isProtectedPath: () => false,
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Error while reading AuthContext');
  }

  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [token, setToken] = useState('');
  const [user, setUser] = useState<User | undefined>(undefined);
  const prevLoginPathRef = useRef<string | undefined>(undefined);

  const initAuth = (token: string, user: User) => {
    setToken(token);
    setUser(user);
  };

  const removeAuth = () => {
    setToken('');
    setUser(undefined);
  };

  const isLogged = () => {
    if (!token || !user) {
      return false;
    }
    return true;
  };

  const isProtectedPath = (path: string) => {
    if (path != RouterPaths.cart &&
        path != RouterPaths.checkout &&
        path != RouterPaths.orders) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (router.asPath != RouterPaths.login &&
        router.asPath != RouterPaths.register) {
      prevLoginPathRef.current = router.asPath;
    }
  }, [router.asPath])

  return (
    <AuthContext.Provider
      value={{ 
        token, 
        user, 
        prevLoginPath: prevLoginPathRef.current,
        initAuth,
        removeAuth,
        isLogged,
        isProtectedPath,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
