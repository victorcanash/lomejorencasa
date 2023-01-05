import type { NextPage } from 'next';
import Head from 'next/head';

import { FormattedMessage, useIntl } from 'react-intl';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { pages } from '@core/config/navigation.config';
import LinkButton from '@core/components/LinkButton';
import usePage from '@lib/hooks/usePage';
import ProTip from '@components/ui/ProTip';
import Copyright from '@components/ui/Copyright';

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
      <Box maxWidth="sm">
        <LinkButton href={pages.home.path}>
          <FormattedMessage id="about.homeBtn" />
        </LinkButton>
      </Box>
      <ProTip />
      <Copyright />
    </>
  );
};

export default About;
