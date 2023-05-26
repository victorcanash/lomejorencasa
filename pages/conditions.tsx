import type { NextPage } from 'next';

import { PageTypes } from '@core/constants/navigation';

import usePage from '@lib/hooks/usePage';
import PageHeader from '@core/components/pages/PageHeader';
import Conditions from '@components/legalTexts/Conditions';

const ConditionsPage: NextPage = () => {
  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'conditions.metas.title',
          descriptionId: 'conditions.metas.description',
          noindex: true,
          nofollow: true,
        }}
        marginTop={true}
        texts={{
          title: {
            id: 'conditions.h1',
          },
        }}
      />

      <Conditions />
    </>
  );
};

export default ConditionsPage;
