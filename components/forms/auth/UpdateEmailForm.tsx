import { Formik, Form } from 'formik';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

import { initRegisterValues, updateEmailValidation } from '@core/constants/forms/auth';
import { FormUpdateEmail } from '@core/types/forms/auth';
import useAuth from '@lib/hooks/useAuth';

const UpdateEmailForm = () => {
  const { sendUpdateEmail, errorMsg, successMsg } = useAuth();

  const handleSubmit = async (values: FormUpdateEmail) => {
    sendUpdateEmail(values);
  };

  return (
    <Container maxWidth="xs">

      <Divider sx={{ my: 3 }} />
      
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        <Typography component="h2" variant="h6">
           Change your email address
        </Typography>

        <Formik
          initialValues={{
            password: initRegisterValues.password,
            newEmail: initRegisterValues.email,
          } as FormUpdateEmail}
          validationSchema={updateEmailValidation}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {props => (
            <Form>

              <Typography component="h3" variant="subtitle1" mt={1}>
                Introduce your new email address and we will send you an email with a link to confirm your new email address.
              </Typography>

              {/* Password Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="password1"
                name="password"
                type="password"
                autoComplete="current-password"
                label="Password"
                value={props.values.password}
                onChange={props.handleChange}
                error={props.touched.password && Boolean(props.errors.password)}
                helperText={props.touched.password && props.errors.password}
              />

              {/* NewEmail Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="newEmail"
                name="newEmail"
                autoComplete="email"
                label="New Email Address"   
                value={props.values.newEmail}
                onChange={props.handleChange}
                error={props.touched.newEmail && Boolean(props.errors.newEmail)}
                helperText={props.touched.newEmail && props.errors.newEmail}
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

            </Form>
          )}
        </Formik>

      </Box>

    </Container>
  );
};

export default UpdateEmailForm;
