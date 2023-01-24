import { useState } from 'react';
import type { NextPage } from 'next';

import { PageTypes } from '@core/constants/navigation';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import RegisterForm from '@components/forms/auth/RegisterForm';
import ResendActivationForm from '@components/forms/auth/ResendActivationForm';

const Register: NextPage = () => { 
  const page = usePage();
  
  const [email, setEmail] = useState<string | undefined>(undefined);

  const onRegisterSuccess = (email: string) => {
    window.scrollTo(0, 0);
    setEmail(email);
  };

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'register.metas.title',
          descriptionId: 'register.metas.description',
        }}
      />
      
      { !email ?
        <RegisterForm onSuccess={onRegisterSuccess} />
        :
        <ResendActivationForm email={email} />
      }
    </>
  );
};

export default Register;
