import type { NextPage } from 'next';

import { PageTypes } from '@core/constants/navigation';

import usePage from '@lib/hooks/usePage';
import PageHeader from '@core/components/pages/PageHeader';
import Legal from '@core/components/legalTexts/Legal';

const LegalPage: NextPage = () => {
  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'legal.metas.title',
          descriptionId: 'legal.metas.description',
          noindex: true,
          nofollow: true,
        }}
        texts={{
          title: {
            id: 'legal.h1',
          },
        }}
        marginTop={true}
      />

      <Legal />
    </>
  );
};

export default LegalPage;
