import type { NextPage } from 'next';

import { PageTypes } from '@core/constants/navigation';

import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import Faq from '@components/faq';

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
