import type { NextPage } from 'next';
import Head from "next/head";

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Link from '@core/components/Link';
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
        <Button variant="contained" component={Link} noLinkStyle href="/">
          Go to the home page
        </Button>
      </Box>
      <ProTip />
      <Copyright />
    </>
  );
};

export default NotFound;
