import type { NextPage } from 'next';
import Head from "next/head";

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Link from '@core/components/Link';
import ProTip from '@core/components/ProTip';
import Copyright from '@core/components/Copyright';
import usePage from '@lib/hooks/usePage';
import { useSearchContext } from '@lib/contexts/SearchContext';

const Home: NextPage = () => {
  const page = usePage();

  const { sortBy, order, keywords } = useSearchContext();

  const hrefSearch = `/search?sortBy=${sortBy}&order=${order}&keywords=${keywords}`;

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
        <Button variant="contained" component={Link} noLinkStyle href={hrefSearch}>
          Explore our products
        </Button>
      </Box>
      <ProTip />
      <Copyright />
    </>
  )
}

export default Home
