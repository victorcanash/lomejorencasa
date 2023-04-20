import type { NextPage } from 'next';

import { PageTypes } from '@core/constants/navigation';

import { keywords } from '@lib/config/next-seo.config';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import EverfreshHome from '@components/products/home';

const Home: NextPage = () => {
  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: keywords.vacuumMachine.main,
          descriptionId: keywords.vacuumMachine.main,
        }}
      />

      <EverfreshHome />
    </>
  );
};

export default Home;
