import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
// import 'react-medium-image-zoom/dist/styles.css'
import 'styles/globals.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { DefaultSeo } from 'next-seo';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from 'notistack';

import envConfig from '@core/config/env.config';
import createEmotionCache from '@core/cache/createEmotionCache';
import { title, description } from '@lib/constants/metas';
import theme from '@lib/themes';
import { AppProvider } from '@lib/contexts/AppContext';
import { SearchProvider } from '@lib/contexts/SearchContext';
import Layout from '@components/Layout';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { asPath } = useRouter();

  return (
    <>
      <DefaultSeo
        title={title}
        description={description}
        openGraph={{
          type: 'website',
          title: title,
          url: `https://${envConfig.NEXT_PUBLIC_URL!}${asPath}`,
          description: description,
          images: [
            {
              url: `https://${envConfig.NEXT_PUBLIC_URL!}/logo_lg.png`,
              width: 1000,
              height: 750,
            },
          ],
          site_name: title,
        }}
      />

      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="keywords" content="ecommerce, shop, nextjs" />
          <meta name="author" content="Victor Canas" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <AppProvider>
            <SearchProvider>     
              <Layout>
                <Component {...pageProps} />
              </Layout>          
            </SearchProvider>
          </AppProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </CacheProvider>
    </>
  )
}

export default MyApp
