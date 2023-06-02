import { useState } from 'react';

import MaintenanceBanner from '@core/components/banners/AppBanners/MaintenanceBanner';

import { themeCustomElements } from '@lib/config/theme/elements';
import { useAuthContext } from '@core/contexts/AuthContext';
import CookiesBanner from '@core/components/banners/AppBanners/CookiesBanner';
import RegisterBanner from '@core/components/banners/AppBanners/RegisterBanner';

const AppBanners = () => {
  const { enabledRegisterBanner } = useAuthContext();

  const [openRegisterBanner, setOpenRegisterBanner] = useState(false);

  const handleRegisterBanner = () => {
    setOpenRegisterBanner(!open);
  };

  const onConsentCookies = () => {
    enabledRegisterBanner.current = false;
    setTimeout(() => {
      setOpenRegisterBanner(true);
    }, 5000);
  };

  return (
    <>
      <CookiesBanner
        onConsentCookies={onConsentCookies}
      />
      <RegisterBanner
        open={openRegisterBanner}
        setOpen={setOpenRegisterBanner}
        handleBanner={handleRegisterBanner}
      />
      <MaintenanceBanner
        themeElementContent={themeCustomElements.banners?.maintenance?.content}
        themeElementIcon={themeCustomElements.banners?.maintenance?.icon}
        text={{ id: 'banners.maintenance' }}
      />
    </>
  );
};

export default AppBanners;
