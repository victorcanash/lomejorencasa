import { createContext, useContext, useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';

import { cardPaymentMethodPayload, paypalPaymentMethodPayload } from 'braintree-web-drop-in';

import { pages } from '@lib/constants/navigation';
import { Protections } from '@core/constants/auth';
import type { User } from '@core/types/user';
import type { CheckoutPayment } from '@core/types/checkout';

type ContextType = {
  token: string,
  setToken: Dispatch<SetStateAction<string>>,
  braintreeToken?: string,
  setBraintreeToken: Dispatch<SetStateAction<string | undefined>>,
  user?: User,
  setUser: Dispatch<SetStateAction<User | undefined>>,
  checkoutPayment?: CheckoutPayment,
  setCheckoutPayment: Dispatch<SetStateAction<CheckoutPayment | undefined>>,
  getCardPayload: () => cardPaymentMethodPayload | undefined,
  getPaypalPayload: () => paypalPaymentMethodPayload | undefined,
  prevLoginPath?: string,
  isLogged: () => boolean,
  isProtectedPath: () => boolean,
  isAdminPath: () => boolean,
};

export const AuthContext = createContext<ContextType>({
  token: '',
  setToken: () => {},
  braintreeToken: '',
  setBraintreeToken: () => {},
  user: undefined,
  setUser: () => {},
  checkoutPayment: undefined,
  setCheckoutPayment: () => {},
  getCardPayload: () => undefined,
  getPaypalPayload: () => undefined,
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
  const [braintreeToken, setBraintreeToken] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [checkoutPayment, setCheckoutPayment] = useState<CheckoutPayment | undefined>(undefined);
  const prevLoginPathRef = useRef<string | undefined>(undefined);

  const getCardPayload = () => {
    return checkoutPayment?.methodPayload as cardPaymentMethodPayload;
  };

  const getPaypalPayload = () => {
    return checkoutPayment?.methodPayload as paypalPaymentMethodPayload;
  };

  const isLogged = () => {
    if (!token || !user) {
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
        getCardPayload,
        getPaypalPayload,
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
