import {
  createContext,
  useContext,
  useCallback,
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
  MutableRefObject,
} from 'react';
import { useRouter } from 'next/router';

import { getCookie } from 'cookies-next';

import { ConsentKey, ConsentValues } from '@core/constants/cookies';
import { Protections } from '@core/constants/auth';
import { Page } from '@core/types/navigation';
import type { PaypalCredentials } from '@core/types/payment';
import type { User, GuestUser } from '@core/types/user';
import type { CheckoutData } from '@core/types/checkout';
import { reinitFBEvents } from '@core/utils/facebook';

import { pages, originRedirects } from '@lib/config/navigation.config';

type ContextType = {
  token: string,
  setToken: Dispatch<SetStateAction<string>>,
  paypal?: PaypalCredentials,
  setPaypal: Dispatch<SetStateAction<PaypalCredentials | undefined>>,
  user: User | GuestUser,
  setUser: (user: User | GuestUser, reloadFBEvents?: boolean) => void
  currency: string,
  checkoutData: CheckoutData,
  setCheckoutData: Dispatch<SetStateAction<CheckoutData>>,
  removeUser: () => void,
  prevLoginPath?: string,
  isLogged: () => boolean,
  isProtectedPath: () => boolean,
  isAdminPath: () => boolean,
  getRedirectProtectedPath: () => string,
  getRedirectLogoutPath: () => string | undefined,
  convertPriceToString: (price: number) => string,
  enabledRegisterBanner: MutableRefObject<boolean>,
};

export const AuthContext = createContext<ContextType>({
  token: '',
  setToken: () => {},
  paypal: undefined,
  setPaypal: () => {},
  user: {} as GuestUser,
  setUser: () => {},
  currency: '',
  checkoutData: {} as CheckoutData,
  setCheckoutData: () => {},
  removeUser: () => {},
  prevLoginPath: undefined,
  isLogged: () => false,
  isProtectedPath: () => false,
  isAdminPath: () => false,
  getRedirectProtectedPath: () => '',
  getRedirectLogoutPath: () => undefined,
  convertPriceToString: () => '',
  enabledRegisterBanner: {} as MutableRefObject<boolean>,
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
  const [paypal, setPaypal] = useState<PaypalCredentials | undefined>(undefined);
  const [user, setUser] = useState<User | GuestUser>({} as GuestUser);
  const [currency, _setCurrency] = useState('EUR');
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({} as CheckoutData);
  const prevLoginPathRef = useRef<string | undefined>(undefined);
  const enabledRegisterBanner = useRef(false);

  const updateUser = (user: User | GuestUser, reloadFBEvents = true) => {
    if (reloadFBEvents) {
      reinitFBEvents(user, router.locale);
    }
    setUser(user);
  };

  const removeUser = useCallback(() => {
    setUser({
      email: undefined,
    } as GuestUser);
    setCheckoutData({} as CheckoutData);
  }, []);

  const isLogged = useCallback(() => {
    if (!token || !(user as User)?.id) {
      return false;
    }
    return true;
  }, [token, user]);

  const isProtectedPath = useCallback(() => {
    for (const [, page] of Object.entries(pages)) {
      if ((page as Page)?.filepath == router.pathname) {
        if ((page as Page)?.protection == Protections.user) {
          return true;
        }
        break;
      }
    }
    return false;
  }, [router.pathname]);

  const isAdminPath = useCallback(() => {
    for (const [, page] of Object.entries(pages)) {
      if ((page as Page)?.filepath == router.pathname) {
        if ((page as Page)?.protection == Protections.admin) {
          return true;
        }
        break;
      }
    }
    return false;
  }, [router.pathname]);

  const getRedirectProtectedPath = useCallback(() => {
    for (const [, page] of Object.entries(pages)) {
      if ((page as Page)?.filepath == router.pathname) {
        return (page as Page)?.redirectPathOnProtected|| pages.login.path;
      }
    }
    return pages.login.path;
  }, [router.pathname]);

  const getRedirectLogoutPath = useCallback(() => {
    for (const [, page] of Object.entries(pages)) {
      if ((page as Page)?.filepath == router.pathname) {
        return (page as Page)?.redirectPathOnLogout|| pages.login.path;
      }
    }
    return undefined;
  }, [router.pathname]);

  const convertPriceToString = useCallback((price: number) => {
    if (currency === 'EUR') {
      return `${price.toFixed(2)}€`;
    }
    return `${price.toFixed(2)}$`;
  }, [currency]);

  const originRedirect = useCallback(() => {
    const origin = location.origin;
    for (let i = 0; i < originRedirects.from.length; i++) {
      if (origin.includes(originRedirects.from[i])) {
        router.push(`${originRedirects.to}${router.asPath}`);
        return true;
      }
    }
    return false;
  }, [router]);

  useEffect(() => {
    if (originRedirect()) {
      return;
    }
    Object.entries(pages).forEach(([_key, page]) => {
      if ((page as Page)?.filepath == router.pathname) {
        if ((page as Page)?.savePathOnLogin?.enabled) {
          prevLoginPathRef.current = (page as Page)?.savePathOnLogin?.path || router.asPath;
        }
        return;
      }
    });
  }, [originRedirect, router.asPath, router.pathname])

  useEffect(() => {
    if (getCookie(ConsentKey) === ConsentValues.accepted) {
      enabledRegisterBanner.current = true;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ 
        token,
        setToken,
        paypal,
        setPaypal,
        user,
        setUser: updateUser,
        currency,
        checkoutData,
        setCheckoutData,
        removeUser,
        prevLoginPath: prevLoginPathRef.current,
        isLogged,
        isProtectedPath,
        isAdminPath,
        getRedirectProtectedPath,
        getRedirectLogoutPath,
        convertPriceToString,
        enabledRegisterBanner,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
