import { ReactNode, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

import { scrollToSection } from '@core/utils/navigation';
import { sendPageViewFBEvent } from '@core/utils/facebook';
import { sendPageViewGTMEvent } from '@core/utils/gtm';

import { useAppContext } from '@lib/contexts/AppContext';
import MainComponent from '@components/layouts/MainComponent';
import NavBar from '@core/components/NavBar';
import Footer from '@core/components/Footer';
import Banners from '@components/banners';

const WebLayout = ({ children }: { children: ReactNode }) => {
  const { initialized } = useAppContext();

  const router = useRouter();

  const checkScroll = useCallback(() => {
    const path = window.location.hash;
    if (path && path.includes('#')) {
      scrollToSection();
    }
  }, []);

  useEffect(() => {
    checkScroll();
    // This pageview only triggers the first time (it's important for Pixel to have real information)
    sendPageViewFBEvent();
    const handleRouteChange = (url: string) => {
      checkScroll();
      sendPageViewFBEvent();
      sendPageViewGTMEvent(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [checkScroll, router.events]);

  useEffect(() => {
    if (initialized) {
      checkScroll();
    }
  }, [checkScroll, initialized])

  return (
    <>
      <NavBar />
      <Banners />
      <MainComponent>
        {children}
      </MainComponent>
      <Footer />
    </>
  );
};

export default WebLayout;
