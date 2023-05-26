import type { NextPage } from 'next';

import { PageTypes } from '@core/constants/navigation';

import usePage from '@lib/hooks/usePage';
import PageHeader from '@core/components/pages/PageHeader';
import Faq from '@core/components/Faq';

const FaqPage: NextPage = () => {
  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'faq.metas.title',
          descriptionId: 'faq.metas.description',
        }}
        marginTop={true}
        texts={{
          title: {
            id: 'faq.h1',
          },
        }}
      /> 
      
      <Faq />
    </>
  );
};

export default FaqPage;
