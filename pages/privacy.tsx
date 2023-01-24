import type { NextPage } from 'next';

import { FormattedMessage } from 'react-intl';

import Typography from '@mui/material/Typography';

import { PageTypes } from '@core/constants/navigation';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';

const Privacy: NextPage = () => {
  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'privacy.metas.title',
          descriptionId: 'privacy.metas.description',
        }}
        texts={{
          titleId: 'privacy.h1',
        }}
      />

      <Typography component="p" variant="body1">
        <FormattedMessage id="privacy.content" />
      </Typography>
    </>
  );
};

export default Privacy;
