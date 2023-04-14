import { ReactNode } from 'react';

import useCookies from '@lib/hooks/useCookies';
import MainComponent from '@components/layouts/MainComponent';
import NavBar from '@components/NavBar';
import Footer from '@components/Footer';
import MaintenanceBanner from '@components/banners/MaintenanceBanner';

const WebLayout = ({ children }: { children: ReactNode }) => {
  const { CookiesBanner } = useCookies();

  return (
    <>
      <NavBar />
      <MainComponent>
        {children}
      </MainComponent>
      <Footer />
      <CookiesBanner />
      <MaintenanceBanner />
    </>
  );
};

export default WebLayout;
