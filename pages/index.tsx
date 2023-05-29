import type { NextPage } from 'next';

import { PageTypes } from '@core/constants/navigation';

import { keywords } from '@lib/config/next-seo.config';
import usePage from '@core/hooks/usePage';
import PageHeader from '@core/components/pages/PageHeader';
import HomeView from '@components/HomeView';

const HomePage: NextPage = () => {
  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleAdd: keywords.vacuumMachine.main,
          descriptionAdd: keywords.vacuumMachine.main,
        }}
      />

      <HomeView />
    </>
  );
};

export default HomePage;
