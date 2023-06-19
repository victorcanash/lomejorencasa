import type { NextPage } from 'next';

import { PageTypes } from '@core/constants/navigation';

import usePage from '@core/hooks/usePage';
import PageHeader from '@core/components/pages/PageHeader';
import Admin from '@core/components/Admin';

const AdminPage: NextPage = () => {
  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.admin}
        metas={{
          titleId: 'admin.metas.title',
          descriptionId: 'admin.metas.description',
          noindex: true,
          nofollow: true,
        }}
        marginTop={true}
      />

      { page.checked &&
        <Admin />
      }
    </>
  );
};

export default AdminPage;
