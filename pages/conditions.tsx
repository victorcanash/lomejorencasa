import type { NextPage } from 'next';

import { FormattedMessage } from 'react-intl';

import Typography from '@mui/material/Typography';

import { PageTypes } from '@core/constants/navigation';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';

const Conditions: NextPage = () => {
  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'conditions.metas.title',
          descriptionId: 'conditions.metas.description',
        }}
        texts={{
          titleId: 'conditions.h1',
        }}
      />

      <Typography component="p" variant="body1">
        <FormattedMessage id="conditions.content" />
      </Typography>
    </>
  );
};

export default Conditions;
