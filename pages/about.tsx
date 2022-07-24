import React, { useRef, useEffect } from 'react';
import type { NextPage } from 'next';

import Container from '@mui/material/Container';
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
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 12,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
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
      </Box>
    </Container>
  );
};

export default About;
