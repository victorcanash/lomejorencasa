import type { NextPage } from 'next';
import Head from "next/head";

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import LinkButton from '@core/components/LinkButton';
import ProTip from '@components/ui/ProTip';
import Copyright from '@components/ui/Copyright';
import { getPageProps, PageProps } from '@lib/server/page';
import usePage from '@lib/hooks/usePage';


const About: NextPage<PageProps> = (props) => {
  const page = usePage(props);

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
        <LinkButton href="/">
          Go to the home page
        </LinkButton>
      </Box>
      <ProTip />
      <Copyright />
    </>
  );
};

export default About;

export const getServerSideProps = getPageProps;
