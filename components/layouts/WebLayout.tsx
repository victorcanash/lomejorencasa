import { ReactNode } from 'react';

import { useAppContext } from '@lib/contexts/AppContext';
import useRegisterBanner from '@lib/hooks/useRegisterBanner';
import MainComponent from '@components/layouts/MainComponent';
import NavBar from '@components/NavBar';
import Footer from '@components/Footer';
import MaintenanceBanner from '@components/banners/MaintenanceBanner';

const WebLayout = ({ children }: { children: ReactNode }) => {
  const { CookiesBanner, GoogleAnalythics } = useAppContext();

  const { RegisterBanner } = useRegisterBanner();

  return (
    <>
      <NavBar />
      <MainComponent>
        {children}
      </MainComponent>
      <Footer />
      <CookiesBanner />
      <RegisterBanner />
      <GoogleAnalythics />
      <MaintenanceBanner />
    </>
  );
};

export default WebLayout;
