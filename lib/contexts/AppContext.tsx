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
import { setCookie, getCookie } from 'cookies-next';

import {
  ConsentKey,
  FunctionalConsentKey,
  AnalyticConsentKey,
  PerformanceConsentKey,
  AdConsentKey,
  WithoutCategoryConsentKey,
  ConsentValues,
} from '@core/constants/cookies';
import type { Consents } from '@core/types/cookies';
import { consentFBEvents } from '@core/utils/facebook';
import { consentGTMEvents } from '@core/utils/gtm';

type ContextType = {
  loading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>,
  initialized: boolean,
  setInitialized: Dispatch<SetStateAction<boolean>>,
  openCookiesBanner: boolean,
  setConsentCookies: (consents: Consents) => void,
};

export const AppContext = createContext<ContextType>({
  loading: false,
  setLoading: () => {},
  initialized: false,
  setInitialized: () => {},
  openCookiesBanner: false,
  setConsentCookies: () => {},
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
  const [openCookiesBanner, setOpenCookiesBanner] = useState(true);

  const setConsentCookies = useCallback((consents: Consents) => {
    consentFBEvents(consents.ad);
    consentGTMEvents(consents.analytic);
    setOpenCookiesBanner(false);
    setCookie(
      ConsentKey,
      ConsentValues.accepted,
    );
    setCookie(
      FunctionalConsentKey,
      consents.functional ? ConsentValues.accepted : ConsentValues.refused,
    );
    setCookie(
      AnalyticConsentKey,
      consents.analytic ? ConsentValues.accepted : ConsentValues.refused,
    );
    setCookie(
      PerformanceConsentKey,
      consents.performance ? ConsentValues.accepted : ConsentValues.refused,
    );
    setCookie(
      AdConsentKey,
      consents.ad ? ConsentValues.accepted : ConsentValues.refused,
    );
    setCookie(
      WithoutCategoryConsentKey,
      consents.withoutCategory ? ConsentValues.accepted : ConsentValues.refused,
    );
  }, []);

  useEffect(() => {
    NP.enableBoundaryChecking(false);

    setOpenCookiesBanner(
      getCookie(ConsentKey) === ConsentValues.accepted ?
        false : true
    );
  }, []);

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        initialized,
        setInitialized,
        openCookiesBanner,
        setConsentCookies,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
