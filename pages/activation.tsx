import type { NextPage } from 'next';
import Head from 'next/head';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

import { ActivationProps, getActivationProps } from '@lib/server/activation';
import usePage from '@lib/hooks/usePage';

const Activation: NextPage<ActivationProps> = (props) => {
  const { successMsg, errorMsg } = props;

  const page = usePage();

  return (
    <>
      <Head>
        <title>Account activation</title>
        <meta name="description" content="Activation page" />
      </Head>

      <Container 
        maxWidth={false}
        className="centeredPage"
      >
        <Avatar 
          sx={{ 
            mb: 1, 
            bgcolor: 'secondary.main' 
          }}
        >
          {
            successMsg != '' ?
              <CheckCircleIcon />
              :
              <ErrorIcon />
          }
        </Avatar>

        <Typography component="h1" variant="h5">
          Account activation link
        </Typography>

        <Typography component="h2" variant="subtitle1" my={2}>
          { successMsg || errorMsg }
        </Typography>

      </Container>
    </>
  );
};

export default Activation;

export const getServerSideProps = getActivationProps;
