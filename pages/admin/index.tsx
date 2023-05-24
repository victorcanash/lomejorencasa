import type { NextPage } from 'next';

import { PageTypes } from '@core/constants/navigation';

import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import Admin from '@components/admin';

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

      <Admin
        pageChecked={page.checked}
      />
    </>
  );
};

export default AdminPage;
