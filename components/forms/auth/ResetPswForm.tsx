import { useRouter } from 'next/router';

import { Formik, Form } from 'formik';
import { useIntl, FormattedMessage } from 'react-intl';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

import { AuthResetPsw } from '@core/types/auth';
import useAuth from '@lib/hooks/useAuth';
import useForms from '@lib/hooks/useForms';

const ResetPswForm = () => {
  const router = useRouter();
  const intl = useIntl();

  const { resetPsw: resetPassword, errorMsg, successMsg } = useAuth();
  const { resetPasswordFormValidation, userFieldsInitValues } = useForms();

  const handleSubmit = async (values: AuthResetPsw) => {
    const updateToken = typeof router.query.token == 'string' ? router.query.token : '';
    resetPassword(updateToken, values);
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

        <Typography component="h1" variant="h1">
          <FormattedMessage 
            id="forms.resetPassword.title" 
          />
        </Typography>

        <Typography component="h2" variant="body1" mt={4}>
          <FormattedMessage 
            id="forms.resetPassword.description" 
          />
        </Typography>

        <Formik
          initialValues={{
            newPassword: userFieldsInitValues.password,
            newConfirm: userFieldsInitValues.confirm,
          } as AuthResetPsw}
          validationSchema={resetPasswordFormValidation}
          onSubmit={handleSubmit}
        >
          {props => (
            <Form>

              {/* NewPassword Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="newPassword"
                name="newPassword"
                autoComplete="new-password"
                label={intl.formatMessage({ id: "forms.newPassword" })}
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
                label={intl.formatMessage({ id: "forms.confirmPassword" })}
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
                <FormattedMessage 
                  id="forms.resetPassword.successBtn" 
                />
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

export default ResetPswForm;
