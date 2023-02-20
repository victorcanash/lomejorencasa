import type { NextPage } from 'next';

import Container from '@mui/material/Container';

import { PageTypes } from '@core/constants/navigation';

import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import UContactForm from '@components/forms/user/UContactForm';

const Contact: NextPage = () => {
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
        <UContactForm />
      </Container>
    </>
  );
};

export default Contact;