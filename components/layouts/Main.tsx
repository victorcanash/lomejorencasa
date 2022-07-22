import { NextPageContext } from 'next';
import type { NextComponentType } from 'next';

import { useAppContext } from '@lib/contexts/AppContext';
import { Loading } from '@components/layouts/Loading';
import { Header } from '@components/layouts/Header';
import { Footer } from '@components/layouts/Footer';

type Props = {
  Component: NextComponentType<NextPageContext, any, {}>;
  pageProps: any;
};

export const Main = (props: Props) => {
  const { Component, pageProps } = props;

  const { initialized, loading } = useAppContext();
 
  return (
    <>
      {
        loading &&
          <Loading />
      }

      {
        initialized &&
          <>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </>
      }
    </>
  )
}