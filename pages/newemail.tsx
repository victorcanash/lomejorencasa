import type { NextPage } from 'next';

import { PageTypes } from '@core/constants/navigation';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import ConfirmNewEmailForm from '@components/forms/auth/ConfirmNewEmailForm';

const NewEmail: NextPage = () => {
  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.link}
        metas={{
          titleId: 'newemail.metas.title',
          descriptionId: 'newemail.metas.description',
        }}
      />

      <ConfirmNewEmailForm />
    </>
  );
};

export default NewEmail;
