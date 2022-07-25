import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';

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

import Link from '@core/components/Link';
import { loginValidation } from '@core/constants';
import type { AuthLogin, User } from '@core/types';
import { loginUser } from '@core/utils/auth';
import { useAppContext } from '@lib/contexts/AppContext';

export const LoginForm = () => {
  const firstRenderRef = useRef(false);

  const { token, setLoading, setToken, setUser, user } = useAppContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const initialValues = { 
    email: '',
    password: '',
  };

  const handleSubmit = async (values: {email: string, password: string}) => {
    setLoading(true);
    const authLogin: AuthLogin = {
      email: values.email,
      password: values.password
    };
    loginUser(authLogin, token).then((response: {token: string, user: User}) => {
      setToken(response.token);
      setUser(response.user);
      router.push('/');
    }).catch((error: Error) => {
      let errorMsg = error.message
      if (errorMsg.includes('email')) {
        errorMsg = 'Email not found'
      } else if (errorMsg.includes('password')) {
        errorMsg = 'Password not found'
      } else if (errorMsg.includes('locked out')) {
        errorMsg = 'You are locked out'
      } else {
        errorMsg = 'Something went wrong, try again'
      }
      setErrorMsg(errorMsg);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (!firstRenderRef.current) {
      firstRenderRef.current = true;
      setLoading(false);
    }    
  });

  return (
    <Container component="main" maxWidth="xs">

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
          initialValues={initialValues}
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

              {/* SUBMIT FORM */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                /*disabled={ formik.isSubmitting || !formik.isValid || !formik.touched.email }*/
              >
                Sign In
              </Button>

              {
                errorMsg && errorMsg !== '' &&
                  <Alert severity="error">{ errorMsg }</Alert>
              } 

              <Grid container>
                <Grid item xs>
                  <Link href="/login" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    Don't have an account? Sign Up
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
