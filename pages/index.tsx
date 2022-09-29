import type { NextPage } from 'next';
import Head from 'next/head';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import LinkButton from '@core/components/LinkButton';
import { useSearchContext } from '@lib/contexts/SearchContext';
import usePage from '@lib/hooks/usePage';
import ProTip from '@components/ui/ProTip';
import Copyright from '@components/ui/Copyright';

const Home: NextPage = () => {
  const page = usePage();
  const { getHref } = useSearchContext();

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
        <LinkButton href={getHref()}>
          Explore our products
        </LinkButton>
      </Box>
      <ProTip />
      <Copyright />
    </>
  )
}

export default Home
