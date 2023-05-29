import type { NextPage } from 'next';

import Container from '@mui/material/Container';

import { PageTypes } from '@core/constants/navigation';

import usePage from '@lib/hooks/usePage';
import PageHeader from '@core/components/pages/PageHeader';
import ForgotPswForm from '@core/components/forms/auth/ForgotPswForm';

const ForgotPage: NextPage = () => { 
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

export default ForgotPage;
