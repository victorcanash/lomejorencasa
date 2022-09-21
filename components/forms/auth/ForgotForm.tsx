import { Formik, Form } from 'formik';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

import { RouterPaths } from '@core/constants/navigation';
import Link from '@core/components/Link';
import { initRegisterValues, forgotValidation } from '@core/constants/forms/auth';
import useAuth from '@lib/hooks/useAuth';

const ForgotForm = () => {
  const { sendResetEmail, errorMsg, successMsg } = useAuth();

  const handleSubmit = async (values: {email: string}) => {
    sendResetEmail(values.email);
  };

  return (
    <Container maxWidth="xs">

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        <Avatar 
          sx={{ 
            m: 1, 
            bgcolor: 'secondary.main' 
          }}
        >
            <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Update your password
        </Typography>

        <Typography component="h2" variant="h6">
          Introduce the email linked to your account and we will send you an email with a link to set your new password.
        </Typography>

        <Formik
          initialValues={{
            email: initRegisterValues.email,
          }}
          validationSchema={forgotValidation}
          onSubmit={handleSubmit}
        >
          {props => (
            <Form>

              {/* Email Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                label="Email Address"
                autoFocus
                value={props.values.email}
                onChange={props.handleChange}
                error={props.touched.email && Boolean(props.errors.email)}
                helperText={props.touched.email && props.errors.email}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Send email
              </Button>

              {
                errorMsg && errorMsg !== '' &&
                  <Alert severity="error">{ errorMsg }</Alert>
              }  
              {
                successMsg && successMsg !== '' &&
                  <Alert>{ successMsg }</Alert>
              }  

              <Grid container>

                <Grid item>
                  <Link href={RouterPaths.login} variant="body2">
                    Back to Sign in
                  </Link>
                </Grid>
              </Grid>

            </Form>
          )}
        </Formik>

      </Box>

    </Container>
  );
};

export default ForgotForm;
