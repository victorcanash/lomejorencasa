import { Formik, Form } from 'formik';

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

import { pages } from '@core/config/navigation.config';
import Link from '@core/components/Link';
import { loginValidation, initLoginValues } from '@core/constants/forms/auth';
import { AuthLogin } from '@core/types/auth';
import useAuth from '@lib/hooks/useAuth';

type LoginFormProps = {
  onFailByActivation: (email: string) => void,
}

const LoginForm = (props: LoginFormProps) => {
  const { onFailByActivation } = props;

  const { login, errorMsg } = useAuth();

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
            bgcolor: 'secondary.main' 
          }}
        >
            <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Formik
          initialValues={initLoginValues}
          validationSchema={loginValidation}
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
                label="Email Address"
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
                label="Password"
                value={props.values.password}
                onChange={props.handleChange}
                error={props.touched.password && Boolean(props.errors.password)}
                helperText={props.touched.password && props.errors.password}
              />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              {
                errorMsg && errorMsg !== '' &&
                  <Alert severity="error">{ errorMsg }</Alert>
              } 

              <Grid container>
                <Grid item xs>
                  <Link href={pages.forgot.path} variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href={pages.register.path} variant="body2">
                    Don&apos;t have an account? Sign up
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
