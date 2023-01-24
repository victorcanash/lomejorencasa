import type { NextPage } from 'next';

import { PageTypes } from '@core/constants/navigation';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import ForgotPswForm from '@components/forms/auth/ForgotPswForm';

const Forgot: NextPage = () => { 
  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'forgot.metas.title',
          descriptionId: 'forgot.metas.description',
        }}
      />
      
      <ForgotPswForm />
    </>
  )
};

export default Forgot;
