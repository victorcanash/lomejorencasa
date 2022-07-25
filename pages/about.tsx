import React, { useRef, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from "next/head";

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Link from '@core/components/Link';
import ProTip from '@core/components/ProTip';
import Copyright from '@core/components/Copyright';
import { useAppContext } from '@lib/contexts/AppContext';

const About: NextPage = () => {
  const firstRenderRef = useRef(false);

  const { setLoading } = useAppContext();

  useEffect(() => {
    if (!firstRenderRef.current) {
      firstRenderRef.current = true;
      setLoading(false);
    }    
  });

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
        <Button variant="contained" component={Link} noLinkStyle href="/">
          Go to the home page
        </Button>
      </Box>
      <ProTip />
      <Copyright />
    </>
  );
};

export default About;
