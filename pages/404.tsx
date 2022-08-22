import type { NextPage } from 'next';
import Head from "next/head";

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import LinkButton from '@core/components/LinkButton';
import ProTip from '@components/ui/ProTip';
import Copyright from '@components/ui/Copyright';
import usePage from '@lib/hooks/usePage';

const NotFound: NextPage = () => {
  const page = usePage();
  
  return (
    <>
      <Head>
        <title>Not Found</title>
        <meta name="description" content="Not found page" />
      </Head>

      <Container 
        className="above-layout"
        sx={{
          backgroundColor: 'background.default',
          position: 'fixed',
          top: '0px',
          left: '0px',
          zIndex: 10000,
          width: '100vw',
          height: '100vh',
          display: 'flex', 
          placeContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
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
      </Container>
    </>
  );
};

export default NotFound;
