import type { NextPage } from 'next';

import Container from '@mui/material/Container';

import { PageTypes } from '@core/constants/navigation';

import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import RegisterForm from '@components/forms/auth/RegisterForm';

const Register: NextPage = () => { 
  const _page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'register.metas.title',
          descriptionId: 'register.metas.description',
          noindex: true,
          nofollow: true,
        }}
        marginTop={true}
      />
      
      <Container>
        <RegisterForm />
      </Container>
    </>
  );
};

export default Register;
