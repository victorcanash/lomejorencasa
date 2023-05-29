import type { NextPage } from 'next';

import Container from '@mui/material/Container';

import { PageTypes } from '@core/constants/navigation';

import usePage from '@core/hooks/usePage';
import PageHeader from '@core/components/pages/PageHeader';
import UserContactForm from '@core/components/forms/user/UserContactForm';

const ContactPage: NextPage = () => {
  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'contact.metas.title',
          descriptionId: 'contact.metas.description',
        }}
        marginTop={true}
        texts={{
          title: {
            id: 'contact.h1',
          },
        }}
      />

      <Container>
        <UserContactForm />
      </Container>
    </>
  );
};

export default ContactPage;