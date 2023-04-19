import type { NextPage } from 'next';

import Container from '@mui/material/Container';

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
          noindex: true,
          nofollow: true,
        }}
        marginTop={true}
      />
      
      <Container>
        <ForgotPswForm />
      </Container>
    </>
  )
};

export default Forgot;
