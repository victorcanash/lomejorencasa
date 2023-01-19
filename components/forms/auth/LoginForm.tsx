import { Formik, Form } from 'formik';
import { useIntl, FormattedMessage } from 'react-intl';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

import { pages } from '@lib/constants/navigation';
import Link from '@core/components/Link';
import { AuthLogin } from '@core/types/auth';
import useAuth from '@lib/hooks/useAuth';
import useForms from '@lib/hooks/useForms';

type LoginFormProps = {
  onFailByActivation: (email: string) => void,
}

const LoginForm = (props: LoginFormProps) => {
  const { onFailByActivation } = props;

  const intl = useIntl();

  const { login, errorMsg } = useAuth();
  const { loginFormValidation, userFieldsInitValues } = useForms();

  const handleSubmit = async (values: AuthLogin) => {
    login(values, onFailByActivation);
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
          }}
        >
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h1">
          <FormattedMessage 
            id="forms.login.title" 
          />
        </Typography>

        <Formik
          initialValues={{
            email: userFieldsInitValues.email,
            password: userFieldsInitValues.password,
            remember: userFieldsInitValues.remember,
          } as AuthLogin}
          validationSchema={loginFormValidation}
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
                label={intl.formatMessage({ id: "forms.email" })}
                autoFocus
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
                type="password"
                autoComplete="current-password"
                label={intl.formatMessage({ id: "forms.password" })}
                value={props.values.password}
                onChange={props.handleChange}
                error={props.touched.password && Boolean(props.errors.password)}
                helperText={props.touched.password && props.errors.password}
              />

              {/* Remember Field */}
              <FormControlLabel
                label={intl.formatMessage({ id: "forms.rememberMe" })}
                control={
                  <Checkbox 
                    id="remember"
                    name="remember"
                    checked={props.values.remember} 
                    onChange={props.handleChange}
                  />
                }
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
              >
                <FormattedMessage 
                  id="forms.login.successBtn" 
                />
              </Button>

              {
                errorMsg && errorMsg !== '' &&
                  <Alert severity="error" sx={{ mb: 1 }}>{ errorMsg }</Alert>
              } 

              <Grid container>
                <Grid item xs>
                  <Link href={pages.forgot.path} variant="body1">
                    <FormattedMessage 
                      id="forms.login.forgotLink" 
                    />
                  </Link>
                </Grid>
                <Grid item>
                  <Link href={pages.register.path} variant="body1">
                    <FormattedMessage 
                      id="forms.login.registerLink" 
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

export default LoginForm;
