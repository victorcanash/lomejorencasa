import type { NextPage } from 'next';

import { useIntl } from 'react-intl';

import { PageTypes } from '@core/constants/navigation';

import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import ErrorView from '@components/exceptions/ErrorView';

const ErrorPage: NextPage = () => {
  const intl = useIntl();

  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.error}
        metas={{
          titleId: 'error.metas.title',
          descriptionId: 'error.metas.description',
          noindex: true,
          nofollow: true,
        }}
        marginTop={true}
      />

      <ErrorView title={intl.formatMessage({ id: 'error.h1' })} />
    </>
  );
};

export default ErrorPage;
