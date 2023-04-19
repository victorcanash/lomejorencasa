import type { NextPage } from 'next';

import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { PageTypes } from '@core/constants/navigation';

import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';

const Legal: NextPage = () => {
  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'legal.metas.title',
          descriptionId: 'legal.metas.description',
          noindex: true,
          nofollow: true,
        }}
        texts={{
          title: {
            id: 'legal.h1',
          },
        }}
        marginTop={true}
      />

      <Container>
        <Typography component="p" variant="body1">
          <FormattedMessage id="legal.content" />
        </Typography>
      </Container>
    </>
  );
};

export default Legal;
