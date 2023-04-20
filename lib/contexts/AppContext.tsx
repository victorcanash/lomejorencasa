import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';

import GoogleAnalythics from '@bradgarropy/next-google-analytics';
import TagManager from 'react-gtm-module';

import envConfig from '@core/config/env.config';
import { Storages } from '@core/constants/storage';
import { CookiesConsentKey, CookiesConsentValues } from '@core/constants/cookies';
import { getStorageItem, setStorageItem } from '@core/utils/storage';

import CookiesBanner from '@components/banners/CookiesBanner';

type ContextType = {
  loading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>,
  initialized: boolean,
  setInitialized: Dispatch<SetStateAction<boolean>>,
  CookiesBanner: () => JSX.Element,
  GoogleAnalythics: () => JSX.Element,
};

export const AppContext = createContext<ContextType>({
  loading: false,
  setLoading: () => {},
  initialized: false,
  setInitialized: () => {},
  CookiesBanner: () => <></>,
  GoogleAnalythics: () => <></>,
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

  const [openCookiesBanner, setOpenCookiesBanner] = useState(false);
  const [acceptedCookies, setAcceptedCookies] = useState(false);

  const handleCookiesBanner = () => {
    setOpenCookiesBanner(!openCookiesBanner);
  };

  const onRefuseCookies = useCallback(() => {
    setAcceptedCookies(false);
    setStorageItem(Storages.local, CookiesConsentKey, CookiesConsentValues.refused);
  }, []);

  const onAcceptCookies = useCallback(() => {
    setAcceptedCookies(true);
    setStorageItem(Storages.local, CookiesConsentKey, CookiesConsentValues.accepted);
  }, []);

  useEffect(() => {
    if (acceptedCookies) {
      TagManager.initialize({ 
        gtmId: envConfig.NEXT_PUBLIC_GOOGLE_GTM_ID,
      });
    }
  }, [acceptedCookies]);

  useEffect(() => {
    if (!getStorageItem(Storages.local, CookiesConsentKey)) {
      setOpenCookiesBanner(true);
    } else {
      setOpenCookiesBanner(false);
    }
  }, []);

  const CookiesBannerComponent = () => (
    <CookiesBanner
      open={openCookiesBanner}
      handleBanner={handleCookiesBanner}
      onRefuse={onRefuseCookies}
      onAccept={onAcceptCookies}
    />
  );

  const GoogleAnalythicsComponent = () => (
    <>
      { acceptedCookies &&
        <GoogleAnalythics
          measurementId={envConfig.NEXT_PUBLIC_GOOGLE_AM_ID}
        />
      }
    </>
  );

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        initialized,
        setInitialized,
        CookiesBanner: CookiesBannerComponent,
        GoogleAnalythics: GoogleAnalythicsComponent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
