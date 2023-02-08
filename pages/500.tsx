import type { NextPage } from 'next';

import { useIntl } from 'react-intl';

import { PageTypes } from '@core/constants/navigation';

import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import ErrorPage from '@components/exceptions/ErrorPage';

const Error: NextPage = () => {
  const intl = useIntl();

  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.error}
        metas={{
          titleId: 'error.metas.title',
          descriptionId: 'error.metas.description',
        }}
        marginTop={true}
      />

      <ErrorPage title={intl.formatMessage({ id: 'error.h1' })} />
    </>
  );
};

export default Error;
