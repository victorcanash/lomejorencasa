import { Formik, Form } from 'formik';
import { useIntl, FormattedMessage } from 'react-intl';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

import envConfig from '@core/config/env.config';
import type { UserContact } from '@core/types/user';
import { useAuthContext } from '@lib/contexts/AuthContext';
import useUser from '@lib/hooks/useUser';
import useForms from '@lib/hooks/useForms';

const UContactForm = () => {
  const { user } = useAuthContext();

  const intl = useIntl();
  const { contactUserFormValidation, userFieldsInitValues } = useForms();
  const { sendUserContactEmail, errorMsg, successMsg } = useUser();

  const handleSubmit = async (values: UserContact) => {
    sendUserContactEmail(values);
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

        <Formik
          initialValues={{
            email: user?.email || userFieldsInitValues.email,
            firstName: user?.firstName || userFieldsInitValues.firstName,
            tlf: userFieldsInitValues.tlf,
            comments: userFieldsInitValues.comments,
          } as UserContact}
          validationSchema={contactUserFormValidation}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {props => (
            <Form>

              <Typography component="h4" variant="body1">
                <FormattedMessage 
                  id="contact.description"
                  values={{
                    email: envConfig.NEXT_PUBLIC_EMAIL,
                  }} 
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

              {/* FirstName Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                name="firstName"
                autoComplete="firstName"
                label={intl.formatMessage({ id: "forms.firstName" })}
                value={props.values.firstName}
                onChange={props.handleChange}
                error={props.touched.firstName && Boolean(props.errors.firstName)}
                helperText={props.touched.firstName && props.errors.firstName}
              />

              {/* Telephone Field */}
              <TextField
                margin="normal"
                fullWidth
                id="tlf"
                name="tlf"
                autoComplete="tlf"
                label={intl.formatMessage({ id: "forms.tlf" })}
                value={props.values.tlf}
                onChange={props.handleChange}
                error={props.touched.tlf && Boolean(props.errors.tlf)}
                helperText={props.touched.tlf && props.errors.tlf}
              />

              {/* Comments Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="comments"
                name="comments"
                autoComplete="comments"
                label={intl.formatMessage({ id: "forms.comments" })}
                value={props.values.comments}
                onChange={props.handleChange}
                error={props.touched.comments && Boolean(props.errors.comments)}
                helperText={props.touched.comments && props.errors.comments}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                <FormattedMessage 
                  id="app.sendBtn" 
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

export default UContactForm;