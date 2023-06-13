import type { NextPage } from 'next';

import { PageTypes } from '@core/constants/navigation';

import usePage from '@core/hooks/usePage';
import PageHeader from '@core/components/pages/PageHeader';
import CategoryList from '@core/components/CategoryList';

const CollectionsPage: NextPage = () => {
  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'collections.metas.title',
          descriptionId: 'collections.metas.description',
          noindex: true,
          nofollow: true,
        }}
        marginTop={true}
        texts={{
          title: {
            id: 'collections.h1',
          },
        }}
      />
      
      <CategoryList
        type="collectionsPage"
      />
    </>
  );
};

export default CollectionsPage;
