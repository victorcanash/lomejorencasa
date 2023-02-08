import type { NextPage } from 'next';

import { useIntl } from 'react-intl';

import { PageTypes } from '@core/constants/navigation';

import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import ErrorPage from '@components/exceptions/ErrorPage';

const NotFound: NextPage = () => {
  const intl = useIntl();

  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.notFound}
        metas={{
          titleId: 'notfound.metas.title',
          descriptionId: 'notfound.metas.description',
        }}
        marginTop={true}
      />

      <ErrorPage title={intl.formatMessage({ id: 'notfound.h1' })} />
    </>
  );
};

export default NotFound;
