import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import 'styles/globals.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
// import { useRouter } from 'next/router';

import { DefaultSeo } from 'next-seo';
import { IntlProvider } from 'react-intl';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { SnackbarProvider } from 'notistack';
// import { GoogleOAuthProvider } from '@react-oauth/google';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/es';

import createEmotionCache from '@core/cache/createEmotionCache';
import envConfig from '@core/config/env.config';

import { messages } from '@lib/constants/lang';
import theme from '@lib/constants/themes';
import { AppProvider } from '@lib/contexts/AppContext';
import { SearchProvider } from '@lib/contexts/SearchContext';
import { ProductsProvider } from '@lib/contexts/ProductsContext';
import { CartProvider } from '@lib/contexts/CartContext';
import { AuthProvider } from '@lib/contexts/AuthContext';
import ErrorBoundary from '@components/exceptions/ErrorBoundary';
import MainLayout from '@components/layouts/MainLayout';

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

  return (
    <>
      <DefaultSeo
        title={title}
        description={description}
        openGraph={{
          type: 'website',
          title: title,
          url: `https://${envConfig.NEXT_PUBLIC_APP_URL}${props.router.asPath}`,
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
        <meta name="keywords" content="ecommerce, shop, nextjs, laenvasadora, la envasadora, envasadora, al vacío" />
        <meta name="author" content={title} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <IntlProvider locale={locale} messages={messages[locale]}>
        <CacheProvider value={emotionCache}>
          <SnackbarProvider maxSnack={3} autoHideDuration={5000}>     
            {/*<GoogleOAuthProvider clientId={envConfig.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>*/}
            
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

            {/*</GoogleOAuthProvider>*/}   
          </SnackbarProvider>
        </CacheProvider>
      </IntlProvider>
    </>
  );
};

export default MyApp;
