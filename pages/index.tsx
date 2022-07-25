import React, { useRef, useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import ProTip from '@core/components/ProTip';
import Copyright from '@core/components/Copyright';
import { useAppContext } from '@lib/contexts/AppContext';

const Home: NextPage = () => {
  const firstRenderRef = useRef(false);

  const { setLoading } = useAppContext();

  const router = useRouter();

  const goToPage = (to: string) => {
    console.log('from', router.pathname);
    console.log('to', to);
    router.push(to);
  };

  const onClickExploreBtn = () => {
    setLoading(true);
    goToPage('/search/all');
  };

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
          Welcome to the shop
        </Typography>
        <Box maxWidth="sm">
          <Button variant="contained" onClick={onClickExploreBtn}>
            Explore our products
          </Button>
        </Box>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  )
}

export default Home
