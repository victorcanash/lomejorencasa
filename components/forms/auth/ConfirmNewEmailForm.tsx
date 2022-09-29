import { useRouter } from 'next/router';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import useAuth from '@lib/hooks/useAuth';

const ConfirmNewEmailForm = () => {
  const router = useRouter();
  const { updateEmail, errorMsg, successMsg } = useAuth();

  const handleSubmit = async () => {
    const updateToken = typeof router.query.token == 'string' ? router.query.token : '';
    updateEmail(updateToken);
  }

  return (
    <Container maxWidth="lg">
      
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
      
        <Typography component="h1" variant="h5">
          Confirm new email link
        </Typography>

        <Typography component="h2" variant="subtitle1" mt={4}>
          Click the confirm button to update and activate your new email
        </Typography>

        <Button
          variant="contained"
          onClick={handleSubmit}
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

      </Box>

    </Container>
  );
};

export default ConfirmNewEmailForm;
