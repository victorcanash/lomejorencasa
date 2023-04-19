import { useState } from 'react';
import type { NextPage } from 'next';

import Container from '@mui/material/Container';

import { PageTypes } from '@core/constants/navigation';

import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import LoginForm from '@components/forms/auth/LoginForm';
import ResendActivationForm from '@components/forms/auth/ResendActivationForm';

const Login: NextPage = () => { 
  const page = usePage();

  const [email, setEmail] = useState<string | undefined>(undefined);

  const onLoginFailByActivation = (email: string) => {
    window.scrollTo(0, 0);
    setEmail(email);
  };

  const onClickProceedBtn = () => {
    setEmail(undefined);
  };

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
      
      <Container>
        { !email ?
          <LoginForm onFailByActivation={onLoginFailByActivation} />
          :
          <ResendActivationForm email={email} onClickProceedBtn={onClickProceedBtn} />
        }
      </Container>
    </>
  );
};

export default Login;
