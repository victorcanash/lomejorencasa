import type { NextPage } from 'next';
import Head from "next/head";

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import LinkButton from '@core/components/LinkButton';
import ProTip from '@core/components/ProTip';
import Copyright from '@core/components/Copyright';

import usePage from '@lib/hooks/usePage';

const NotFound: NextPage = () => {
  const page = usePage();
  
  return (
    <>
      <Head>
        <title>Not Found</title>
        <meta name="description" content="Not found page" />
      </Head>

      <Typography variant="h4" component="h1" gutterBottom>
        Not found page
      </Typography>
      <Box maxWidth="sm">
        <LinkButton href="/">
          Go to the home page
        </LinkButton>
      </Box>
      <ProTip />
      <Copyright />
    </>
  );
};

export default NotFound;
