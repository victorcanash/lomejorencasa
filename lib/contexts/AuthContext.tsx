import { createContext, useContext, useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';

import { RouterPaths, routerPathsProtected, routerPathsAdmin } from '@core/constants/navigation';
import type { User } from '@core/types/user';

type ContextType = {
  token: string,
  setToken: Dispatch<SetStateAction<string>>,
  user?: User,
  setUser: Dispatch<SetStateAction<User | undefined>>,
  prevLoginPath: string | undefined,
  isLogged: () => boolean,
  isProtectedPath: (path: string) => boolean,
  isAdminPath: (path: string) => boolean,
};

export const AuthContext = createContext<ContextType>({
  token: '',
  setToken: () => {},
  user: undefined,
  setUser: () => {},
  prevLoginPath: undefined,
  isLogged: () => false,
  isProtectedPath: () => false,
  isAdminPath: () => false,
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

  const isLogged = () => {
    if (!token || !user) {
      return false;
    }
    return true;
  };

  const isProtectedPath = (path: string) => {
    if (!routerPathsProtected.includes(path as RouterPaths)) {
      return false;
    }
    return true;
  };

  const isAdminPath = (path: string) => {
    if (!routerPathsAdmin.includes(path as RouterPaths)) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (router.asPath != RouterPaths.login &&
        router.asPath != RouterPaths.register &&
        router.asPath != RouterPaths.forgot &&
        router.asPath != RouterPaths.activation &&
        router.asPath != RouterPaths.reset &&
        router.asPath != RouterPaths.newemail &&
        router.asPath != RouterPaths.admin) {
      prevLoginPathRef.current = router.asPath;
    }
  }, [router.asPath])

  return (
    <AuthContext.Provider
      value={{ 
        token, 
        setToken,
        user, 
        setUser,
        prevLoginPath: prevLoginPathRef.current,
        isLogged,
        isProtectedPath,
        isAdminPath,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
