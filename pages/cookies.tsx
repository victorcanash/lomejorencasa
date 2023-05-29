import type { NextPage } from 'next';

import { PageTypes } from '@core/constants/navigation';

import usePage from '@lib/hooks/usePage';
import PageHeader from '@core/components/pages/PageHeader';
import Cookies from '@core/components/legalTexts/Cookies';

const CookiesPage: NextPage = () => {
  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'cookies.metas.title',
          descriptionId: 'cookies.metas.description',
          noindex: true,
          nofollow: true,
        }}
        marginTop={true}
        texts={{
          title: {
            id: 'cookies.h1',
          },
        }}
      />

      <Cookies />
    </>
  );
};

export default CookiesPage;
