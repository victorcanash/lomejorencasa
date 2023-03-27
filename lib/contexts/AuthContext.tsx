import { 
  createContext, 
  useContext, 
  useState, 
  useRef, 
  useEffect, 
  Dispatch, 
  SetStateAction 
} from 'react';
import { useRouter } from 'next/router';

import { PaymentModes } from '@core/constants/app';
import { Protections } from '@core/constants/auth';
import type { PaypalCredentials } from '@core/types/paypal';
import type { GoogleCredentials } from '@core/types/google';
import type { User, GuestUser } from '@core/types/user';
import type { CheckoutData } from '@core/types/checkout';

import { pages } from '@lib/constants/navigation';

type ContextType = {
  token: string,
  setToken: Dispatch<SetStateAction<string>>,
  braintreeToken?: string,
  setBraintreeToken: Dispatch<SetStateAction<string | undefined>>,
  paypal?: PaypalCredentials,
  setPaypal: Dispatch<SetStateAction<PaypalCredentials | undefined>>,
  google: GoogleCredentials,
  setGoogle: Dispatch<SetStateAction<GoogleCredentials>>,
  user: User | GuestUser,
  setUser: Dispatch<SetStateAction<User | GuestUser>>,
  paymentMode: PaymentModes,
  setPaymentMode: Dispatch<SetStateAction<PaymentModes>>,
  currency: string,
  setCurrency: Dispatch<SetStateAction<string>>,
  confirmTokenExpiry: string,
  setConfirmTokenExpiry: Dispatch<SetStateAction<string>>,
  checkoutData: CheckoutData,
  setCheckoutData: Dispatch<SetStateAction<CheckoutData>>,
  removeUser: () => void,
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
  paypal: undefined,
  setPaypal: () => {},
  google: {} as GoogleCredentials,
  setGoogle: () => {},
  user: {} as GuestUser,
  setUser: () => {},
  paymentMode: PaymentModes.braintree,
  setPaymentMode: () => {},
  currency: '',
  setCurrency: () => {},
  confirmTokenExpiry: '',
  setConfirmTokenExpiry: () => {},
  checkoutData: {} as CheckoutData,
  setCheckoutData: () => {},
  removeUser: () => {},
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
  const [paypal, setPaypal] = useState<PaypalCredentials | undefined>(undefined);
  const [google, setGoogle] = useState<GoogleCredentials>({} as GoogleCredentials);
  const [user, setUser] = useState<User | GuestUser>({} as GuestUser);
  const [paymentMode, setPaymentMode] = useState(PaymentModes.braintree);
  const [currency, setCurrency] = useState('');
  const [confirmTokenExpiry, setConfirmTokenExpiry] = useState('');
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({} as CheckoutData);
  const prevLoginPathRef = useRef<string | undefined>(undefined);

  const removeUser = () => {
    setUser({
      email: undefined, 
      shipping: undefined, 
      billing: undefined,
    } as GuestUser);
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
        paypal,
        setPaypal,
        google,
        setGoogle,
        user,
        setUser,
        paymentMode,
        setPaymentMode,
        currency,
        setCurrency,
        confirmTokenExpiry,
        setConfirmTokenExpiry,
        checkoutData,
        setCheckoutData,
        removeUser,
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
