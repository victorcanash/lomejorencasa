import { useAuthContext } from '@lib/contexts/AuthContext';
import CookiesBanner from '@components/banners/CookiesBanner';
import RegisterBanner from '@components/banners/RegisterBanner';
import MaintenanceBanner from '@components/banners/MaintenanceBanner';
import { useState } from 'react';

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
      <CookiesBanner onConsentCookies={onConsentCookies} />
      <RegisterBanner open={openRegisterBanner} setOpen={setOpenRegisterBanner} handleBanner={handleRegisterBanner} />
      <MaintenanceBanner />
    </>
  );
};

export default Banners;
