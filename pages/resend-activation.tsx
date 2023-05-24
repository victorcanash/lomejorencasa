import type { NextPage } from 'next';

import { PageTypes } from '@core/constants/navigation';

import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import ResendActivationComponent from '@components/auth/ResendActivation';

const ResendActivation: NextPage = () => {
  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'login.metas.title',
          descriptionId: 'login.metas.description',
          noindex: true,
          nofollow: true,
        }}
        marginTop={true}
      />

      <ResendActivationComponent />
    </>
  );
};

export default ResendActivation;
