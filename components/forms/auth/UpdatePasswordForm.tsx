import { Formik, Form } from 'formik';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

import { updatePasswordValidation } from '@core/constants/forms/auth';
import { initRegisterValues } from '@core/constants/forms/auth';
import { FormUpdateAuth } from '@core/types/forms/auth';
import { useAuthContext } from '@lib/contexts/AuthContext';
import useAuth from '@lib/hooks/useAuth';

const UpdatePasswordForm = () => {
  const { user } = useAuthContext();

  const { update, errorMsg, successMsg } = useAuth();

  const handleSubmit = async (values: FormUpdateAuth) => {
    update(values);
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
          Change password
        </Typography>

        <Formik
          initialValues={{
            password: initRegisterValues.password,
            newEmail: initRegisterValues.email,
            newPassword: initRegisterValues.password,
            newConfirm: initRegisterValues.confirm,
          } as FormUpdateAuth}
          validationSchema={updatePasswordValidation}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {props => (
            <Form>

              {/* Password Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                label="Password"
                value={props.values.password}
                onChange={props.handleChange}
                error={props.touched.password && Boolean(props.errors.password)}
                helperText={props.touched.password && props.errors.password}
              />

              {/* NewPassword Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="newPassword"
                name="newPassword"
                autoComplete="new-password"
                label="New password"
                type="password"   
                value={props.values.newPassword}
                onChange={props.handleChange}
                error={props.touched.newPassword && Boolean(props.errors.newPassword)}
                helperText={props.touched.newPassword && props.errors.newPassword}      
              />

              {/* Confirm NewPassword Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="newConfirm"
                name="newConfirm"
                autoComplete="new-confirm"
                label="Confirm Password"
                type="password"   
                value={props.values.newConfirm}
                onChange={props.handleChange}
                error={props.touched.newConfirm && Boolean(props.errors.newConfirm)}
                helperText={props.touched.newConfirm && props.errors.newConfirm}      
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update
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

export default UpdatePasswordForm;
