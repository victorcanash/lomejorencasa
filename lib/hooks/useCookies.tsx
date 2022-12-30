import { useRef, useState, useEffect } from 'react';

import { Storages } from '@core/constants/storage';
import { CookiesConsentKey, CookiesConsentValues } from '@core/constants/cookies';
import { getStorageItem, setStorageItem } from '@core/utils/storage';
import { useAppContext } from '@lib/contexts/AppContext';
import CookiesBanner from '@components/banners/CookiesBanner';

const useCookies = () => {
  const { initialized } = useAppContext();

  const firstRenderRef = useRef(false);

  const [openCookiesBanner, setOpenCookiesBanner] = useState(false);

  const handleCookiesBanner = () => {
    setOpenCookiesBanner(!openCookiesBanner);
  };

  const onRefuseCookies = () => {
    setStorageItem(Storages.local, CookiesConsentKey, CookiesConsentValues.refused);
  };

  const onAcceptCookies = () => {
    setStorageItem(Storages.local, CookiesConsentKey, CookiesConsentValues.accepted);
  };

  useEffect(() => {
    if (!firstRenderRef.current && initialized) {
      firstRenderRef.current = true;
      if (!getStorageItem(Storages.local, CookiesConsentKey)) {
        setOpenCookiesBanner(true);
      } else {
        setOpenCookiesBanner(false);
      }
    }    
  }, [initialized]);

  const CookiesBannerComponent = () => (
    <CookiesBanner
      open={openCookiesBanner}
      handleBanner={handleCookiesBanner}
      onRefuse={onRefuseCookies}
      onAccept={onAcceptCookies}
    />
  )

  return {
    CookiesBannerComponent,
  };
};

export default useCookies;
