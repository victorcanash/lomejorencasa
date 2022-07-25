import React, { useRef, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from "next/head";
import { useRouter } from 'next/router';

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
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home page" />
      </Head>

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
    </>
  )
}

export default Home
