import { createContext, useContext, useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';

import { cardPaymentMethodPayload, paypalPaymentMethodPayload } from 'braintree-web-drop-in';

import { PaymentModes } from '@core/constants/app';
import { Protections } from '@core/constants/auth';
import type { User, GuestUser } from '@core/types/user';
import type { CheckoutPayment } from '@core/types/checkout';

import { pages } from '@lib/constants/navigation';

type ContextType = {
  token: string,
  setToken: Dispatch<SetStateAction<string>>,
  braintreeToken?: string,
  setBraintreeToken: Dispatch<SetStateAction<string | undefined>>,
  paypalMerchantId?: string,
  setPaypalMerchantId: Dispatch<SetStateAction<string | undefined>>,
  paypalClientId?: string,
  setPaypalClientId: Dispatch<SetStateAction<string | undefined>>,
  paypalToken?: string,
  setPaypalToken: Dispatch<SetStateAction<string | undefined>>,
  user: User | GuestUser,
  setUser: Dispatch<SetStateAction<User | GuestUser>>,
  paymentMode: PaymentModes,
  setPaymentMode: Dispatch<SetStateAction<PaymentModes>>,
  currency: string,
  setCurrency: Dispatch<SetStateAction<string>>,
  checkoutPayment: CheckoutPayment,
  setCheckoutPayment: Dispatch<SetStateAction<CheckoutPayment>>,
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
  braintreeToken: undefined,
  setBraintreeToken: () => {},
  paypalMerchantId: undefined,
  setPaypalMerchantId: () => {},
  paypalClientId: undefined,
  setPaypalClientId: () => {},
  paypalToken: undefined,
  setPaypalToken: () => {},
  user: {} as GuestUser,
  setUser: () => {},
  paymentMode: PaymentModes.braintree,
  setPaymentMode: () => {},
  currency: '',
  setCurrency: () => {},
  checkoutPayment: {} as CheckoutPayment,
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
  const [paypalMerchantId, setPaypalMerchantId] = useState<string | undefined>(undefined);
  const [paypalClientId, setPaypalClientId] = useState<string | undefined>(undefined);
  const [paypalToken, setPaypalToken] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<User | GuestUser>({});
  const [paymentMode, setPaymentMode] = useState(PaymentModes.braintree);
  const [currency, setCurrency] = useState('');
  const [checkoutPayment, setCheckoutPayment] = useState<CheckoutPayment>({});
  const prevLoginPathRef = useRef<string | undefined>(undefined);

  const removeUser = () => {
    setUser({
      email: undefined, 
      shipping: undefined, 
      billing: undefined,
    } as GuestUser);
  };

  const getCardPayload = () => {
    return checkoutPayment?.braintreePayload as cardPaymentMethodPayload;
  };

  const getPaypalPayload = () => {
    return checkoutPayment?.braintreePayload as paypalPaymentMethodPayload;
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
        paypalMerchantId,
        setPaypalMerchantId,
        paypalClientId,
        setPaypalClientId,
        paypalToken,
        setPaypalToken,
        user, 
        setUser,
        paymentMode,
        setPaymentMode,
        currency,
        setCurrency,
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
