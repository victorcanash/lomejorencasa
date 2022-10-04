import { Formik, Form } from 'formik';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Alert from '@mui/material/Alert';

import { pages } from '@core/config/navigation.config';
import Link from '@core/components/Link';
import { initRegisterValues, sendEmailValidation } from '@core/constants/forms/auth';
import { useAuthContext } from '@lib/contexts/AuthContext';
import useAuth from '@lib/hooks/useAuth';

const ForgotPswForm = () => {
  const { user, isLogged } = useAuthContext();

  const { sendResetPswEmail, errorMsg, successMsg } = useAuth();

  const handleSubmit = async (values: {email: string}) => {
    sendResetPswEmail(values.email);
  };

  return (
    <Container maxWidth="xs">

      {
        isLogged() &&
          <Divider sx={{ my: 3 }} />
      }

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        {
          !isLogged &&
            <Avatar 
              sx={{ 
                m: 1, 
                bgcolor: 'secondary.main' 
              }}
            >
                <LockOutlinedIcon />
            </Avatar>
        }

        {
          !isLogged ?
            <Typography component="h1" variant="h5">
              Forgotten password
            </Typography>
            :
            <Typography component="h2" variant="h6">
              Change your password
            </Typography>
        }

        <Formik
          initialValues={{
            email: user?.email || initRegisterValues.email,
          }}
          validationSchema={sendEmailValidation}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {props => (
            <Form>

              <Typography component={!isLogged() ? 'h2' : 'h3'} variant="subtitle1" mt={1}>
                Introduce your email address and we will send you an email with a link to set your new password.
              </Typography>

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

              {
                !isLogged() &&
                  <Grid container>
                    <Grid item>
                      <Link href={pages.login.path} variant="body2">
                        Back to Sign in
                      </Link>
                    </Grid>
                  </Grid>
              }

            </Form>
          )}
        </Formik>

      </Box>

    </Container>
  );
};

export default ForgotPswForm;
