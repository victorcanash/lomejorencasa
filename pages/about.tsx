import type { NextPage } from 'next';

import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { PageTypes } from '@core/constants/navigation';
import Link from '@core/components/Link';

import { pages } from '@lib/constants/navigation';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';

const About: NextPage = () => {
  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'about.metas.title',
          descriptionId: 'about.metas.description',
        }}
        marginTop={true}
        texts={{
          titleId: 'about.h1',
        }}
      />
      
      <Container>

        <Typography component="p" variant="body1" sx={{ mb: 2 }}>
          <FormattedMessage id="about.content" />
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography component={Link} href={pages.contact.path} variant="body1">
            <FormattedMessage 
              id="header.drawerItems.contact" 
            />
          </Typography>
        </Box>

      </Container>
    </>
  );
};

export default About;
