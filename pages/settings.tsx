import type { NextPage } from 'next';

import Divider from '@mui/material/Divider';

import { PageTypes } from '@core/constants/navigation';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import UpdateUserForm from '@components/forms/user/UpdateUserForm';
import UpdateEmailForm from '@components/forms/auth/UpdateEmailForm';
import UpdatePswForm from '@components/forms/auth/UpdatePswForm';

const Settings: NextPage = () => { 
  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'settings.metas.title',
          descriptionId: 'settings.metas.description',
        }}
        texts={{
          titleId: 'settings.h1',
        }}
      />
      
      <UpdateUserForm />

      <Divider sx={{ mb: 3, mt: 5 }} />

      <UpdateEmailForm />

      <Divider sx={{ mb: 3, mt: 5 }} />

      <UpdatePswForm />
    </>
  )
};

export default Settings;
