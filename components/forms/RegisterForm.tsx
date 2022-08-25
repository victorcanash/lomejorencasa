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
import { registerValidation, initRegisterValues } from '@core/constants/auth';
import useAuth from '@lib/hooks/useAuth';

const RegisterForm = () => {
  const { register, errorMsg } = useAuth();

  const handleSubmit = async (values: {firstName: string, lastName: string, email: string, password: string, age: number}) => {
    register(values);
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
          Sign up
        </Typography>

        <Formik
          initialValues={initRegisterValues}
          validationSchema={registerValidation}
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

              {/* Email Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                label="Email Address"   
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
                label="Password"
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
                label="Confirm Password"
                type="password"   
                value={props.values.confirm}
                onChange={props.handleChange}
                error={props.touched.confirm && Boolean(props.errors.confirm)}
                helperText={props.touched.confirm && props.errors.confirm}      
              />

              {/* Age Field */}
              <TextField 
                margin="normal"
                required
                fullWidth
                id="age"
                name="age"
                autoComplete="age"
                label="Age"
                type="number"  
                inputProps={{min: 10, max: 100}} 
                value={props.values.age}
                onChange={props.handleChange}
                error={props.touched.age && Boolean(props.errors.age)}
                helperText={props.touched.age && props.errors.age}      
              />

              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>

              {
                errorMsg && errorMsg !== '' &&
                  <Alert severity="error">{ errorMsg }</Alert>
              }        

              <Grid container>
                <Grid item xs>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
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
