import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Head from 'next/head';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

import usePage from '@lib/hooks/usePage';
import useAuth from '@lib/hooks/useAuth';

const NewEmail: NextPage = () => {
  const router = useRouter();
  const page = usePage();
  const { updateEmail, errorMsg, successMsg } = useAuth();

  const onClickUpdateBtn = () => {
    const token = typeof router.query.token == 'string' ? router.query.token : '';
    updateEmail(token);
  }

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

        <Typography component="h2" variant="subtitle1" mt={4}>
          Click the confirm button to update and activate your new email
        </Typography>

        <Button
          variant="contained"
          onClick={onClickUpdateBtn}
          sx={{
            mt: 4,
            mb: 2,
          }}
        >
          Confirm
        </Button>

        {
          errorMsg && errorMsg !== '' &&
            <Alert severity="error">{ errorMsg }</Alert>
        }  
        {
          successMsg && successMsg !== '' &&
            <Alert>{ successMsg }</Alert>
        } 

      </Container>
    </>
  );
};

export default NewEmail;
