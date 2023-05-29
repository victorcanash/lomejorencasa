import type { NextPage } from 'next';

import { PageTypes } from '@core/constants/navigation';

import usePage from '@core/hooks/usePage';
import PageHeader from '@core/components/pages/PageHeader';
import Privacy from '@core/components/legalTexts/Privacy';

const PrivacyPage: NextPage = () => {
  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'privacy.metas.title',
          descriptionId: 'privacy.metas.description',
          noindex: true,
          nofollow: true,
        }}
        texts={{
          title: {
            id: 'privacy.h1',
          },
        }}
        marginTop={true}
      />

      <Privacy />
    </>
  );
};

export default PrivacyPage;
