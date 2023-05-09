import { useEffect, useState, useCallback } from 'react';

import { Storages } from '@core/constants/storage';
import { CookiesConsentKey, CookiesConsentValues } from '@core/constants/cookies';
import { getStorageItem, setStorageItem } from '@core/utils/storage';

import { useAppContext } from '@lib/contexts/AppContext';
import CookiesBanner from '@components/banners/CookiesBanner';

const useCookiesBanner = () => {
  const { setAcceptedCookies } = useAppContext();

  const [open, setOpen] = useState(true);

  const handleBanner = () => {
    setOpen(!open);
  };

  const refuseCookies = useCallback(() => {
    setAcceptedCookies(false);
    setStorageItem(Storages.local, CookiesConsentKey, CookiesConsentValues.refused);
  }, [setAcceptedCookies]);

  const acceptCookies = useCallback(() => {
    setAcceptedCookies(true);
    setStorageItem(Storages.local, CookiesConsentKey, CookiesConsentValues.accepted);
  }, [setAcceptedCookies]);

  useEffect(() => {
    const cookiesConsentValue = getStorageItem(Storages.local, CookiesConsentKey)
    if (!cookiesConsentValue) {
      setOpen(true);
      setAcceptedCookies(false);
    } else {
      if (cookiesConsentValue === CookiesConsentValues.accepted) {
        setOpen(false);
        setAcceptedCookies(true);
      } else if (cookiesConsentValue === CookiesConsentValues.refused) {
        setOpen(false);
        setAcceptedCookies(false);
      } else {
        setOpen(true);
        setAcceptedCookies(false);
      }
    }
  }, [setAcceptedCookies]);

  const CookiesBannerComponent = () => (
    <CookiesBanner
      open={open}
      handleBanner={handleBanner}
      onRefuse={refuseCookies}
      onAccept={acceptCookies}
    />
  );

  return {
    CookiesBanner: CookiesBannerComponent,
  };
};

export default useCookiesBanner;
