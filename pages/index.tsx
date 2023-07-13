import type { NextPage } from 'next';

import { HomePageProps, getHomeStaticProps } from '@core/staticPages/home';
import { PageTypes } from '@core/constants/navigation';
import usePage from '@core/hooks/usePage';
import PageHeader from '@core/components/pages/PageHeader';

import { keywords } from '@lib/config/next-seo.config';

import HomeView from '@components/HomeView';

const HomePage: NextPage<HomePageProps> = (props) => {
  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleAdd: keywords.main,
          descriptionAdd: keywords.main,
        }}
      />

      <HomeView
        pageProps={props}
      />
    </>
  );
};

export default HomePage;

export const getStaticProps = getHomeStaticProps;
