import type { NextPage } from 'next';

import { PageTypes } from '@core/constants/navigation';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import ContactForm from '@components/forms/user/ContactForm';

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
        texts={{
          titleId: 'contact.h1',
        }}
      />

      <ContactForm />
    </>
  );
};

export default Contact;