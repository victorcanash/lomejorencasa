import type { NextPage } from 'next';

import { useIntl } from 'react-intl';

import { PageTypes } from '@core/constants/navigation';

import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import ErrorView from '@components/exceptions/ErrorView';

const NotFoundPage: NextPage = () => {
  const intl = useIntl();

  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.notFound}
        metas={{
          titleId: 'notfound.metas.title',
          descriptionId: 'notfound.metas.description',
          noindex: true,
          nofollow: true,
        }}
        marginTop={true}
      />

      <ErrorView title={intl.formatMessage({ id: 'notfound.h1' })} />
    </>
  );
};

export default NotFoundPage;
