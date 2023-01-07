import type { NextPage } from 'next';
import Head from 'next/head';

import { FormattedMessage, useIntl } from 'react-intl';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import { pages } from '@core/config/navigation.config';
import Link from '@core/components/Link';
import usePage from '@lib/hooks/usePage';

const About: NextPage = () => {
  const intl = useIntl();

  const page = usePage();

  const title = intl.formatMessage({ id: 'about.metas.title' });
  const description = intl.formatMessage({ id: 'about.metas.description' });

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <Typography variant="h1" component="h1" gutterBottom>
        <FormattedMessage id="about.h1" />
      </Typography>

      <Divider sx={{ mt: 1, mb: 3 }} />
      
      <Typography variant="body1" component="p" gutterBottom sx={{ mb: 2 }}>
        <FormattedMessage id="about.content" />
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography component={Link} href={pages.home.path} variant="body1">
          <FormattedMessage 
            id="footer.utility.conditions" 
          />
        </Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography component={Link} href={pages.home.path} variant="body1">
          <FormattedMessage 
            id="footer.utility.faq" 
          />
        </Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography component={Link} href={pages.home.path} variant="body1">
          <FormattedMessage 
            id="footer.utility.privacy" 
          />
        </Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography component={Link} href={pages.home.path} variant="body1">
          <FormattedMessage 
            id="footer.utility.refund" 
          />
        </Typography>
      </Box>
      <Box>
        <Typography component={Link} href={pages.home.path} variant="body1">
          <FormattedMessage 
            id="footer.utility.shipping" 
          />
        </Typography>
      </Box>
    </>
  );
};

export default About;
