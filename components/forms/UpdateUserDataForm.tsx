import { Formik, Form } from 'formik';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

import { updateUserValidation, initRegisterValues } from '@core/constants/forms';
import { FormUpdateUserData } from '@core/types/forms';
import { useAuthContext } from '@lib/contexts/AuthContext';
import useAuth from '@lib/hooks/useAuth';

const UpdateUserDataForm = () => {
  const { user } = useAuthContext();

  const { updateData, errorMsg, successMsg } = useAuth();

  const handleSubmit = async (values: FormUpdateUserData) => {
    updateData(values);
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
          Update data
        </Typography>

        <Formik
          initialValues={{
            firstName: user?.firstName || initRegisterValues.firstName,
            lastName: user?.lastName || initRegisterValues.lastName,
            birthday: user?.birthday || initRegisterValues.birthday,
          } as FormUpdateUserData}
          validationSchema={updateUserValidation}
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
                label="First Name"
                autoFocus
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
                label="Last Name"
                value={props.values.lastName}
                onChange={props.handleChange}
                error={props.touched.lastName && Boolean(props.errors.lastName)}
                helperText={props.touched.lastName && props.errors.lastName}
              />

              {/* Birthday Field */}
              <DatePicker                           
                label="Birthday"
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
                    helperText={props.touched.birthday && props.errors.birthday}                   
                  />
                }
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

export default UpdateUserDataForm;
