import { useState } from 'react';

import MaintenanceBanner from '@core/components/banners/MaintenanceBanner';

import { themeCustomElements } from '@lib/constants/themes/elements';
import { useAuthContext } from '@lib/contexts/AuthContext';
import CookiesBanner from '@components/banners/CookiesBanner';
import RegisterBanner from '@components/banners/RegisterBanner';

const Banners = () => {
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

export default Banners;
