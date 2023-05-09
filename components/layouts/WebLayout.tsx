import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import GoogleAnalythics from '@bradgarropy/next-google-analytics';
import TagManager from 'react-gtm-module';

import envConfig from '@core/config/env.config';
import { sendPageViewFBEvent } from '@core/utils/facebook';

import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import useCookiesBanner from '@lib/hooks/useCookiesBanner';
import useRegisterBanner from '@lib/hooks/useRegisterBanner';
import MainComponent from '@components/layouts/MainComponent';
import NavBar from '@components/NavBar';
import Footer from '@components/Footer';
import MaintenanceBanner from '@components/banners/MaintenanceBanner';

const WebLayout = ({ children }: { children: ReactNode }) => {
  const { acceptedCookies } = useAppContext();
  const { paypal, currency } = useAuthContext();

  const router = useRouter();

  const { CookiesBanner } = useCookiesBanner();
  const { RegisterBanner } = useRegisterBanner();

  useEffect(() => {
    if (acceptedCookies) {
      TagManager.initialize({ 
        gtmId: envConfig.NEXT_PUBLIC_GOOGLE_GTM_ID,
      });
      // This pageview only triggers the first time (it's important for Pixel to have real information)
      sendPageViewFBEvent();
      const handleRouteChange = () => {
        sendPageViewFBEvent();
      };
      router.events.on('routeChangeComplete', handleRouteChange);
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }
  }, [acceptedCookies, router.events]);

  const Content = () => (
    <>
      <NavBar />
      <MainComponent>
        {children}
      </MainComponent>
      <Footer />
      <CookiesBanner />
      {/*<RegisterBanner />*/}
      <MaintenanceBanner />
      { acceptedCookies &&
        <GoogleAnalythics
          measurementId={envConfig.NEXT_PUBLIC_GOOGLE_AM_ID}
        />
      } 
    </>
  );

  return (
    <GoogleOAuthProvider 
      clientId={envConfig.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}
    >
      { paypal ?
        <PayPalScriptProvider
          options={{
            'locale': 'es_ES',
            'merchant-id': envConfig.NEXT_PUBLIC_PAYPAL_MERCHANT_ID,
            'client-id': envConfig.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
            'data-client-token': paypal.token,
            'currency': currency,
            'intent': 'capture',
            'components':
              paypal.advancedCards ? 'buttons,hosted-fields' : 'buttons',
            //'vault': true,
          }}
        >
          <Content />
        </PayPalScriptProvider>
        :
        <Content />
      }
    </GoogleOAuthProvider>
  );
};

export default WebLayout;
