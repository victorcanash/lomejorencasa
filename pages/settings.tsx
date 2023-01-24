import type { NextPage } from 'next';

import { PageTypes } from '@core/constants/navigation';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import UpdateUserForm from '@components/forms/user/UpdateUserForm';
import UpdateEmailForm from '@components/forms/auth/UpdateEmailForm';
import ForgotPswForm from '@components/forms/auth/ForgotPswForm';

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

      <UpdateEmailForm />

      <ForgotPswForm />
    </>
  )
};

export default Settings;
