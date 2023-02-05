import type { NextPage } from 'next';

import { PageTypes } from '@core/constants/navigation';

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
          titleId: 'home.metas.title',
          descriptionId: 'home.metas.description',
        }}
      />

      <EverfreshHome />
    </>
  );
};

export default Home;
