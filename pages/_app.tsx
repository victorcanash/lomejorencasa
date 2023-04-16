import 'dayjs/locale/en';
import 'dayjs/locale/es';
import '@fortawesome/fontawesome-svg-core/styles.css'; 
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import 'styles/globals.css';

import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
// import { useRouter } from 'next/router';

import NP from 'number-precision'
import { DefaultSeo } from 'next-seo';
import { IntlProvider } from 'react-intl';
import { SnackbarProvider } from 'notistack';
import GoogleAnalythics from '@bradgarropy/next-google-analytics';
import TagManager from 'react-gtm-module';

import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { config } from '@fortawesome/fontawesome-svg-core';

import createEmotionCache from '@core/cache/createEmotionCache';
import envConfig from '@core/config/env.config';

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

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { 
    Component, 
    emotionCache = clientSideEmotionCache, 
    pageProps 
  } = props;

  //const { locale } = useRouter();
  const locale = 'es';

  const title = messages[locale]['app.metas.title'];
  const description = messages[locale]['app.metas.description'];

  useEffect(() => {
    NP.enableBoundaryChecking(false)

    TagManager.initialize({ 
      gtmId: envConfig.NEXT_PUBLIC_GOOGLE_GTM_ID,
    });
  }, []);

  return (
    <>
      <DefaultSeo
        title={title}
        description={description}
        openGraph={{
          type: 'website',
          locale: 'es_ES',
          title: title,
          url: envConfig.NEXT_PUBLIC_APP_URL,
          description: description,
          /*images: [
            {
              url: `https://${envConfig.NEXT_PUBLIC_APP_URL}/logo_lg.png`,
              width: 1000,
              height: 750,
            },
          ],*/
          siteName: title,
        }}
      />

      <Head>
        <meta
          name="keywords"
          content={
            [
              'Laenvasadora',
              'La Envasadora',
              'Envasadora al Vacío',
              'Envasadora al Vacío Everfresh',
              'Bolsas de Vacío',
              'Bolsas de Vacío con Válvula',
              'Máquina de Vacío',
              'Selladora de Alimentos',
            ].join(',')
          }
        />
        <meta name="author" content={title} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <GoogleAnalythics
        measurementId={envConfig.NEXT_PUBLIC_GOOGLE_AM_ID}
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
