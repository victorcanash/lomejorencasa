import type { NextPage } from 'next';
import Head from "next/head";

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { pages } from '@core/config/navigation.config';
import LinkButton from '@core/components/LinkButton';
import usePage from '@lib/hooks/usePage';
import ProTip from '@components/ui/ProTip';
import Copyright from '@components/ui/Copyright';

const About: NextPage = () => {
  const page = usePage();

  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="About page" />
      </Head>

      <Typography variant="h4" component="h1" gutterBottom>
        MUI v5 + Next.js with TypeScript example
      </Typography>
      <Box maxWidth="sm">
        <LinkButton href={pages.home.path}>
          Go to the home page
        </LinkButton>
      </Box>
      <ProTip />
      <Copyright />
    </>
  );
};

export default About;
