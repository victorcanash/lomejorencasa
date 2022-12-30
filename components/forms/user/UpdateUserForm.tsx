import { Formik, Form } from 'formik';
import { useIntl, FormattedMessage } from 'react-intl';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

import { ManageActions } from '@core/constants/auth';
import { User } from '@core/types/user';
import { useAuthContext } from '@lib/contexts/AuthContext';
import useUser from '@lib/hooks/useUser';
import useForms from '@lib/hooks/useForms';

const UpdateUserForm = () => {
  const { user } = useAuthContext();

  const intl = useIntl();

  const { manageUser, errorMsg, successMsg } = useUser();
  const { updateUserFormValidation, userFieldsInitValues } = useForms();

  const handleSubmit = async (values: User) => {
    manageUser(ManageActions.update, values);
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

        <Typography component="h2" variant="h6">
          <FormattedMessage id="forms.updateUser.title" />
        </Typography>

        <Formik
          initialValues={{
            id: user?.id || -1,
            email: user?.email || userFieldsInitValues.email,
            firstName: user?.firstName || userFieldsInitValues.firstName,
            lastName: user?.lastName || userFieldsInitValues.lastName,
            birthday: user?.birthday || userFieldsInitValues.birthday,
            getEmails: user?.getEmails || userFieldsInitValues.getEmails,
          } as User}
          validationSchema={updateUserFormValidation}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {props => (
            <Form>

              {/* First Name Field */}
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

              {/* Last Name Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                name="lastName"
                autoComplete="lastName"        
                label={intl.formatMessage({ id: "forms.lastName" })}
                value={props.values.lastName}
                onChange={props.handleChange}
                error={props.touched.lastName && Boolean(props.errors.lastName)}
                helperText={props.touched.lastName && props.errors.lastName}
              />

              {/* Birthday Field */}
              <DatePicker                           
                label={intl.formatMessage({ id: "forms.birthday" })}
                disableFuture
                openTo="year"
                views={['year', 'month', 'day']}
                value={props.values.birthday}
                onChange={(value) => {
                  props.setFieldValue('birthday', value, true);
                }} 
                renderInput={(params) => 
                  <TextField 
                    {...params} 
                    margin="normal" 
                    required 
                    fullWidth 
                    id="birthday" 
                    name="birthday"
                    autoComplete="birthday"                   
                    error={props.touched.birthday && Boolean(props.errors.birthday)}
                    helperText={props.touched.birthday && props.errors.birthday as string}                   
                  />
                }
              />

              {/* Get Emails Field */}
              <FormControlLabel
                label={intl.formatMessage({ id: "forms.getEmails" })}
                control={
                  <Checkbox 
                    id="getEmails"
                    name="getEmails"
                    checked={props.values.getEmails} 
                    onChange={props.handleChange}
                  />
                }
                sx={{ mt: 1 }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                <FormattedMessage id="forms.updateUser.successBtn" />
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

export default UpdateUserForm;
