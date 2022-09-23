import type { NextPage } from 'next';
import Head from 'next/head';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

import { NewEmailProps, getNewEmailProps } from '@lib/server/newemail';
import usePage from '@lib/hooks/usePage';

const NewEmail: NextPage<NewEmailProps> = (props) => {
  const { successMsg, errorMsg } = props;

  const page = usePage();

  return (
    <>
      <Head>
        <title>Email update</title>
        <meta name="description" content="Email update page" />
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
          Email update link
        </Typography>

        <Typography component="h2" variant="subtitle1" my={2}>
          { successMsg || errorMsg }
        </Typography>

      </Container>
    </>
  );
};

export default NewEmail;

export const getServerSideProps = getNewEmailProps;
