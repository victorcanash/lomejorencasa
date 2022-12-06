import { Formik, Form } from 'formik';
import { useIntl, FormattedMessage } from 'react-intl';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

import { pages } from '@core/config/navigation.config';
import { AuthRegister } from '@core/types/auth';
import Link from '@core/components/Link';
import useAuth from '@lib/hooks/useAuth';
import useForms from '@lib/hooks/useForms';

type RegisterFormProps = {
  onSuccess: (email: string) => void,
}

const RegisterForm = (props: RegisterFormProps) => {
  const { onSuccess } = props;

  const intl = useIntl();

  const { register, errorMsg } = useAuth();
  const { registerFormValidation, userFieldsInitValues } = useForms();

  const handleSubmit = async (values: AuthRegister) => {
    register(values, onSuccess);
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
          <FormattedMessage 
            id="forms.register.title" 
          />
        </Typography>

        <Formik
          initialValues={{
            email: userFieldsInitValues.email,
            password: userFieldsInitValues.password,
            confirm: userFieldsInitValues.confirm,
            firstName: userFieldsInitValues.firstName,
            lastName: userFieldsInitValues.lastName,
            birthday: userFieldsInitValues.birthday,
          } as AuthRegister}
          validationSchema={registerFormValidation}
          onSubmit={handleSubmit}
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
                label={intl.formatMessage({ id: "forms.lastName" })}
                value={props.values.lastName}
                onChange={props.handleChange}
                error={props.touched.lastName && Boolean(props.errors.lastName)}
                helperText={props.touched.lastName && props.errors.lastName}
              />

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

              {/* Password Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                name="password"
                autoComplete="new-password"
                label={intl.formatMessage({ id: "forms.password" })}
                type="password"   
                value={props.values.password}
                onChange={props.handleChange}
                error={props.touched.password && Boolean(props.errors.password)}
                helperText={props.touched.password && props.errors.password}      
              />

              {/* Confirm Password Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="confirm"
                name="confirm"
                autoComplete="new-confirm"
                label={intl.formatMessage({ id: "forms.confirmPassword" })}
                type="password"   
                value={props.values.confirm}
                onChange={props.handleChange}
                error={props.touched.confirm && Boolean(props.errors.confirm)}
                helperText={props.touched.confirm && props.errors.confirm}      
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

              {/*<FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />*/}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                <FormattedMessage 
                  id="forms.register.successBtn" 
                />
              </Button>

              {
                errorMsg && errorMsg !== '' &&
                  <Alert severity="error">{ errorMsg }</Alert>
              }       

              <Grid container>
                <Grid item xs>
                  <Link href={pages.login.path} variant="body2">
                    <FormattedMessage 
                      id="forms.register.loginLink" 
                    />
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

export default RegisterForm;
