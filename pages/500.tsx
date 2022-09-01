import type { NextPage } from 'next';
import Head from "next/head";

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { RouterPaths } from '@core/constants/navigation';
import LinkButton from '@core/components/LinkButton';
import usePage from '@lib/hooks/usePage';
import ProTip from '@components/ui/ProTip';
import Copyright from '@components/ui/Copyright';

const Error: NextPage = () => {
  const page = usePage();
  
  return (
    <>
      <Head>
        <title>Error</title>
        <meta name="description" content="Error page" />
      </Head>

      <Container 
        maxWidth={false}
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
          Error page
        </Typography>
        <Box maxWidth="sm">
          <LinkButton href={RouterPaths.home}>
            Go to the home page
          </LinkButton>
        </Box>
        <ProTip />
        <Copyright />
      </Container>
    </>
  );
};

export default Error;
