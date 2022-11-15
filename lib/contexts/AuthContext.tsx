import { createContext, useContext, useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';

import { PaymentMethodPayload, cardPaymentMethodPayload, paypalPaymentMethodPayload } from 'braintree-web-drop-in';

import { pages } from '@core/config/navigation.config';
import { Protections } from '@core/constants/auth';
import type { User } from '@core/types/user';

type ContextType = {
  token: string,
  setToken: Dispatch<SetStateAction<string>>,
  braintreeToken?: string,
  setBraintreeToken: Dispatch<SetStateAction<string | undefined>>,
  user?: User,
  setUser: Dispatch<SetStateAction<User | undefined>>,
  paymentPayload?: PaymentMethodPayload,
  setPaymentPayload: Dispatch<SetStateAction<PaymentMethodPayload | undefined>>,
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
  paymentPayload: undefined,
  setPaymentPayload: () => {},
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
  const [paymentPayload, setPaymentPayload] = useState<PaymentMethodPayload | undefined>(undefined);
  const prevLoginPathRef = useRef<string | undefined>(undefined);

  const getCardPayload = () => {
    return paymentPayload as cardPaymentMethodPayload;
  };

  const getPaypalPayload = () => {
    return paymentPayload as paypalPaymentMethodPayload;
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
    if (router.asPath != pages.login.path &&
        router.asPath != pages.register.path &&
        router.asPath != pages.forgot.path &&
        router.asPath != pages.activation.path &&
        router.asPath != pages.reset.path &&
        router.asPath != pages.newemail.path &&
        router.asPath != pages.admin.path) {
      prevLoginPathRef.current = router.asPath;
    }
  }, [router.asPath])

  return (
    <AuthContext.Provider
      value={{ 
        token, 
        setToken,
        braintreeToken,
        setBraintreeToken,
        user, 
        setUser,
        paymentPayload,
        setPaymentPayload,
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
