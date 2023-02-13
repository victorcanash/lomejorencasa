import { createContext, useContext, useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';

import { cardPaymentMethodPayload, paypalPaymentMethodPayload } from 'braintree-web-drop-in';

import { Protections } from '@core/constants/auth';
import type { User, GuestUser } from '@core/types/user';
import type { CheckoutPayment } from '@core/types/checkout';

import { pages } from '@lib/constants/navigation';

type ContextType = {
  token: string,
  setToken: Dispatch<SetStateAction<string>>,
  braintreeToken?: string,
  setBraintreeToken: Dispatch<SetStateAction<string | undefined>>,
  user: User | GuestUser,
  setUser: Dispatch<SetStateAction<User | GuestUser>>,
  checkoutPayment?: CheckoutPayment,
  setCheckoutPayment: Dispatch<SetStateAction<CheckoutPayment | undefined>>,
  removeUser: () => void,
  getCardPayload: () => cardPaymentMethodPayload | undefined,
  getPaypalPayload: () => paypalPaymentMethodPayload | undefined,
  prevLoginPath?: string,
  isLogged: () => boolean,
  isProtectedPath: () => boolean,
  isAdminPath: () => boolean,
  getRedirectProtectedPath: () => string,
  getRedirectLogoutPath: () => string | undefined,
};

export const AuthContext = createContext<ContextType>({
  token: '',
  setToken: () => {},
  braintreeToken: '',
  setBraintreeToken: () => {},
  user: {} as GuestUser,
  setUser: () => {},
  checkoutPayment: undefined,
  setCheckoutPayment: () => {},
  removeUser: () => {},
  getCardPayload: () => undefined,
  getPaypalPayload: () => undefined,
  prevLoginPath: undefined,
  isLogged: () => false,
  isProtectedPath: () => false,
  isAdminPath: () => false,
  getRedirectProtectedPath: () => '',
  getRedirectLogoutPath: () => undefined,
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
  const [braintreeToken, setBraintreeToken] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<User | GuestUser>({ 
    email: undefined, 
    shipping: undefined, 
    billing: undefined,
  });
  const [checkoutPayment, setCheckoutPayment] = useState<CheckoutPayment | undefined>(undefined);
  const prevLoginPathRef = useRef<string | undefined>(undefined);

  const removeUser = () => {
    setUser({
      email: undefined, 
      shipping: undefined, 
      billing: undefined,
    } as GuestUser);
  };

  const getCardPayload = () => {
    return checkoutPayment?.methodPayload as cardPaymentMethodPayload;
  };

  const getPaypalPayload = () => {
    return checkoutPayment?.methodPayload as paypalPaymentMethodPayload;
  };

  const isLogged = () => {
    if (!token || !(user as User)?.id) {
      return false;
    }
    return true;
  };

  const isProtectedPath = () => {
    for (const [, page] of Object.entries(pages)) {
      if (page.filepath == router.pathname) {
        if (page.protection == Protections.user) {
          return true;
        }
        break;
      }
    }
    return false;
  };

  const isAdminPath = () => {
    for (const [, page] of Object.entries(pages)) {
      if (page.filepath == router.pathname) {
        if (page.protection == Protections.admin) {
          return true;
        }
        break;
      }
    }
    return false;
  };

  const getRedirectProtectedPath = () => {
    for (const [, page] of Object.entries(pages)) {
      if (page.filepath == router.pathname) {
        return page.redirectPathOnProtected || pages.login.path;
      }
    }
    return pages.login.path;
  };

  const getRedirectLogoutPath = () => {
    for (const [, page] of Object.entries(pages)) {
      if (page.filepath == router.pathname) {
        return page.redirectPathOnLogout;
      }
    }
    return undefined;
  };

  useEffect(() => {
    Object.entries(pages).forEach(([_key, page]) => {
      if (page.filepath == router.pathname) {
        if (page.savePathOnLogin.enabled) {
          prevLoginPathRef.current = page.savePathOnLogin?.path || router.asPath;
        }
        return;
      }
    });
  }, [router.asPath, router.pathname])

  return (
    <AuthContext.Provider
      value={{ 
        token, 
        setToken,
        braintreeToken,
        setBraintreeToken,
        user, 
        setUser,
        checkoutPayment,
        setCheckoutPayment,
        removeUser,
        getCardPayload,
        getPaypalPayload,
        prevLoginPath: prevLoginPathRef.current,
        isLogged,
        isProtectedPath,
        isAdminPath,
        getRedirectProtectedPath,
        getRedirectLogoutPath,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
