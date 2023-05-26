import 'dayjs/locale/en';
import 'dayjs/locale/es';
import '@fortawesome/fontawesome-svg-core/styles.css'; 
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import 'styles/globals.css';

import Head from 'next/head';
import type { AppProps } from 'next/app';
import Script from 'next/script'

import { DefaultSeo } from 'next-seo';
import { IntlProvider } from 'react-intl';
import { SnackbarProvider } from 'notistack';
import { getCookie } from 'cookies-next';

import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { config } from '@fortawesome/fontawesome-svg-core';

import createEmotionCache from '@core/cache/createEmotionCache';
import envConfig from '@core/config/env.config';
import { AdConsentKey, AnalyticConsentKey, ConsentKey, ConsentValues } from '@core/constants/cookies';
import { consentFBEvents } from '@core/utils/facebook';
import { consentGTMEvents } from '@core/utils/gtm';

import seoConfig from '@lib/config/next-seo.config';
import { messages } from '@lib/constants/lang';
import theme from '@lib/constants/themes';
import snackbarConfig from '@lib/constants/snackbar';
import { AppProvider } from '@lib/contexts/AppContext';
import { SearchProvider } from '@lib/contexts/SearchContext';
import { ProductsProvider } from '@lib/contexts/ProductsContext';
import { CartProvider } from '@lib/contexts/CartContext';
import { AuthProvider } from '@lib/contexts/AuthContext';
import ErrorBoundary from '@components/exceptions/ErrorBoundary';
import MainLayout from '@components/layouts/MainLayout';

// Tell Font Awesome to skip adding the CSS automatically 
// since it's already imported above
config.autoAddCss = false; 

const clientSideEmotionCache = createEmotionCache();

const locale = 'es';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { 
    Component, 
    emotionCache = clientSideEmotionCache, 
    pageProps 
  } = props;

  const onReadyPixelFB = () => {
    const consentValue = getCookie(ConsentKey);
    if (consentValue !== ConsentValues.accepted) {
      return;
    }
    const adConsentValue = getCookie(AdConsentKey);
    if (adConsentValue === ConsentValues.accepted) {
      setTimeout(() => {
        consentFBEvents(true);
      }, 3000);
    }
  };

  const onReadyGTM = () => {
    const consentValue = getCookie(ConsentKey);
    if (consentValue !== ConsentValues.accepted) {
      return;
    }
    const analyticConsentValue = getCookie(AnalyticConsentKey);
    if (analyticConsentValue === ConsentValues.accepted) {
      setTimeout(() => {
        consentGTMEvents(true);
      }, 3000);
    }
  };

  return (
    <>
      <DefaultSeo
        { ...seoConfig.defaultSeoProps }
      />

      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="facebook-domain-verification" content="ogx6uggctpg463pxxngpttfinfajqg" />
      </Head>

      {/* Global Site Code Pixel - Facebook Pixel */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('consent', 'revoke');
            fbq('init', ${envConfig.FB_PIXEL_ID});
          `,
        }}
        onReady={() => {
          onReadyPixelFB();
        }}
      />
      {/* Google Tag Manager - Global base code */}
      <Script
        id="gtag-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Initialize the data layer for Google Tag Manager (this should mandatorily be done before the Privacy Controls and Cookie Solution is loaded)
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            // Default consent mode is "denied" for both ads and analytics as well as the optional types, but delay for 2 seconds until the Privacy Controls and Cookie Solution is loaded
            gtag("consent", "default", {
                ad_storage: "denied",
                analytics_storage: "denied",
                wait_for_update: 2000 // milliseconds
            });
            // Improve ad click measurement quality (optional)
            gtag('set', 'url_passthrough', true);
            // Further redact your ads data (optional)
            gtag("set", "ads_data_redaction", true);
            // Google Tag Manager
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${envConfig.GTM_ID}');
          `,
        }}
        onReady={() => {
          onReadyGTM();
        }}
      />

      <IntlProvider locale={locale} messages={messages[locale]}>
        <CacheProvider value={emotionCache}>
          <SnackbarProvider maxSnack={snackbarConfig.maxSnack} autoHideDuration={snackbarConfig.durations.default}>     
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                    
                  <ErrorBoundary>
                    <AppProvider>
                      <SearchProvider>
                        <ProductsProvider>
                          <CartProvider>
                            <AuthProvider>
                              <MainLayout>
                                <Component {...pageProps} />
                              </MainLayout> 
                            </AuthProvider>
                          </CartProvider>
                        </ProductsProvider>          
                      </SearchProvider>
                    </AppProvider>
                  </ErrorBoundary>

                </LocalizationProvider>    
              </ThemeProvider>

          </SnackbarProvider>
        </CacheProvider>
      </IntlProvider>
    </>
  );
};

export default MyApp;
