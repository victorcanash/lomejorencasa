import type { NextPage } from 'next';

import { PageTypes } from '@core/constants/navigation';

import usePage from '@lib/hooks/usePage';
import PageHeader from '@core/components/pages/PageHeader';
import About from '@components/about';

const AboutPage: NextPage = () => {
  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'about.metas.title',
          descriptionId: 'about.metas.description',
          noindex: true,
          nofollow: true,
        }}
        marginTop={true}
        texts={{
          title: {
            id: 'about.h1',
          },
        }}
      />
      
      <About />
    </>
  );
};

export default AboutPage;
