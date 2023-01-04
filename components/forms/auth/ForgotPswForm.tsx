import { Formik, Form } from 'formik';
import { useIntl, FormattedMessage } from 'react-intl';

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
import { useAuthContext } from '@lib/contexts/AuthContext';
import useAuth from '@lib/hooks/useAuth';
import useForms from '@lib/hooks/useForms';

const ForgotPswForm = () => {
  const { user, isLogged } = useAuthContext();

  const intl = useIntl();

  const { sendResetPswEmail, errorMsg, successMsg } = useAuth();
  const { sendEmailFormValidation, userFieldsInitValues } = useForms();

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
              }}
            >
              <LockOutlinedIcon />
            </Avatar>
        }

        {
          !isLogged ?
            <Typography component="h1" variant="h1">
              <FormattedMessage 
                id="forms.forgotPassword.title" 
              />
            </Typography>
            :
            <Typography component="h3" variant="h1">
              <FormattedMessage 
                id="forms.forgotPassword.subtitle" 
              />
            </Typography>
        }

        <Formik
          initialValues={{
            email: user?.email || userFieldsInitValues.email,
          }}
          validationSchema={sendEmailFormValidation}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {props => (
            <Form>

              <Typography component={!isLogged() ? 'h2' : 'h4'} variant="body1" mt={1}>
                <FormattedMessage 
                  id="forms.forgotPassword.description" 
                />
              </Typography>

              {/* Email Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                label={intl.formatMessage({ id: "forms.email" })}
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
                <FormattedMessage 
                  id="forms.forgotPassword.successBtn" 
                />
              </Button>

              {
                errorMsg && errorMsg !== '' &&
                  <Alert severity="error" sx={{ mb: 1 }}>{ errorMsg }</Alert>
              }  
              {
                successMsg && successMsg !== '' &&
                  <Alert sx={{ mb: 1 }}>{ successMsg }</Alert>
              }  

              {
                !isLogged() &&
                  <Grid container>
                    <Grid item>
                      <Link href={pages.login.path} variant="body1">
                        <FormattedMessage 
                          id="forms.forgotPassword.loginLink" 
                        />
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
