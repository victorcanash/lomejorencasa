import 'styles/globals.css';

import { useRef, useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { DefaultSeo } from 'next-seo';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import envConfig from '@core/config/env.config';
import createEmotionCache from '@core/cache/createEmotionCache';
import { User } from '@core/types';
import { getCredentials } from '@core/utils/auth';
import theme from '@lib/themes';
import { MainContext } from '@lib/contexts/MainContext';
import { Loading } from '@components/layouts/Loading';
import { Header } from '@components/layouts/Header';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const meta = {
  title: 'Ecommerce',
  description: 'ecommerce app.',
};

export const titleTemplate = `%s | ${meta.title}`;

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { asPath } = useRouter();

  const firstRenderRef = useRef(false);

  const [initialized, setInitialized] = useState(false);

  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (!firstRenderRef.current) {
      firstRenderRef.current = true; 
      getCredentials().then((response: {token: string, user: User}) => {
        setToken(response.token);
        setUser(response.user);
        setInitialized(true);
      }).catch((error: Error) => {
        setInitialized(true);
      });   
    }    
  }, []);

  return (
    <>
      <DefaultSeo
        title={meta.title}
        description={meta.description}
        openGraph={{
          type: 'website',
          title: meta.title,
          url: `https://${envConfig.NEXT_PUBLIC_URL!}${asPath}`,
          description: meta.description,
          images: [
            {
              url: `https://${envConfig.NEXT_PUBLIC_URL!}/logo_lg.png`,
              width: 1000,
              height: 750,
            },
          ],
          site_name: meta.title,
        }}
      />

      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <MainContext.Provider 
            value={{ 
              loading, 
              setLoading, 
              token, 
              setToken, 
              user, 
              setUser 
            }}
          >

            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />

            {
              loading && 
                  <Loading />
            }

            {
              initialized &&
                <>
                  <Header />
                  <Component {...pageProps} />
                </>
            }

          </MainContext.Provider>
        </ThemeProvider>
      </CacheProvider>
    </>
  )
}

export default MyApp
