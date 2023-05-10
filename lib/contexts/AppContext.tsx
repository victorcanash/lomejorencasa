import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

import NP from 'number-precision'

import { Storages } from '@core/constants/storage';
import { CookiesConsentKey, CookiesConsentValues } from '@core/constants/cookies';
import { getStorageItem, setStorageItem } from '@core/utils/storage';
import { consentFBEvents } from '@core/utils/facebook';

type ContextType = {
  loading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>,
  initialized: boolean,
  setInitialized: Dispatch<SetStateAction<boolean>>,
  acceptedCookies: boolean,
  openCookiesBanner: boolean,
  refuseCookies: () => void,
  acceptCookies: () => void,
};

export const AppContext = createContext<ContextType>({
  loading: false,
  setLoading: () => {},
  initialized: false,
  setInitialized: () => {},
  acceptedCookies: false,
  openCookiesBanner: false,
  refuseCookies: () => {},
  acceptCookies: () => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('Error while reading AppContext');
  }
  return context;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [acceptedCookies, setAcceptedCookies] = useState(false);
  const [openCookiesBanner, setOpenCookiesBanner] = useState(true);

  const refuseCookies = useCallback(() => {
    consentFBEvents(false);
    setOpenCookiesBanner(false);
    setAcceptedCookies(false);
    setStorageItem(Storages.local, CookiesConsentKey, CookiesConsentValues.refused);
  }, [setAcceptedCookies]);

  const acceptCookies = useCallback(() => {
    consentFBEvents(true);
    setOpenCookiesBanner(false);
    setAcceptedCookies(true);
    setStorageItem(Storages.local, CookiesConsentKey, CookiesConsentValues.accepted);
  }, [setAcceptedCookies]);

  useEffect(() => {
    NP.enableBoundaryChecking(false);

    const cookiesConsentValue = getStorageItem(Storages.local, CookiesConsentKey)
    if (cookiesConsentValue === CookiesConsentValues.accepted) {
      setAcceptedCookies(true);
      setOpenCookiesBanner(false);
    } else {
      setAcceptedCookies(false);
      if (cookiesConsentValue === CookiesConsentValues.refused) {
        setOpenCookiesBanner(false);
      } else {
        setOpenCookiesBanner(true);
      }
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        initialized,
        setInitialized,
        acceptedCookies,
        openCookiesBanner,
        refuseCookies,
        acceptCookies,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
