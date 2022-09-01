import { useEffect, useRef } from 'react';

import { Formik, Form } from 'formik';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { addressCheckoutValidation, initRegisterValues, initAddressValues } from '@core/constants/forms';
import type { User, UserAddress } from '@core/types/user';
import type { FormCheckoutAddress } from '@core/types/forms';

type CheckoutPaymentFormProps = {
  user: User | undefined,
  handleNext: () => void,
  handleBack: () => void,
};

const CheckoutPaymentForm = (props: CheckoutPaymentFormProps) => {
  const { user, handleNext, handleBack } = props;

  const initialValuesRef = useRef<FormCheckoutAddress>({ 
    firstName: user?.firstName || initRegisterValues.firstName,
    lastName: user?.lastName || initRegisterValues.lastName,
    age: user?.age || initRegisterValues.age,
    address: user?.addresses[0]?.addressLine || initAddressValues.address,
    additionalInfo: user?.addresses[0]?.additionalInfo || initAddressValues.additionalInfo,
    postalCode: user?.addresses[0]?.postalCode || initAddressValues.postalCode,
    locality: user?.addresses[0]?.locality || initAddressValues.locality,
    //administrativeArea: user.addresses[0]?.administrativeArea || initAddressValues.administrativeArea,
    country: user?.addresses[0]?.country || initAddressValues.country,
  });

  const handleSubmit = async (values: FormCheckoutAddress) => {
    if (!user) {
      return;
    }
    user.firstName = values.firstName;
    user.lastName = values.lastName;
    user.age = values.age;
    const userAddress = {
      id: 0,
      userId: user.id,
      addressLine: values.address,
      additionalInfo: values.additionalInfo,
      postalCode: values.postalCode,
      locality: values.locality,
      administrativeArea: values.locality,
      country: values.country,
      type: 'shipping',
    } as UserAddress;
    if (user.addresses && user.addresses.length > 0 && user.addresses[0]) {
      userAddress.id = user.addresses[0].id;
      user.addresses[0] = userAddress;
    } else {
      user.addresses.push(userAddress);
    }
    handleNext();
  };

  useEffect(() => {
    initialValuesRef.current = { 
      firstName: user?.firstName || initRegisterValues.firstName,
      lastName: user?.lastName || initRegisterValues.lastName,
      age: user?.age || initRegisterValues.age,
      address: user?.addresses[0]?.addressLine || initAddressValues.address,
      additionalInfo: user?.addresses[0]?.additionalInfo || initAddressValues.additionalInfo,
      postalCode: user?.addresses[0]?.postalCode || initAddressValues.postalCode,
      locality: user?.addresses[0]?.locality || initAddressValues.locality,
      //administrativeArea: user.addresses[0]?.administrativeArea || initAddressValues.administrativeArea,
      country: user?.addresses[0]?.country || initAddressValues.country,
    };
  }, [user]);

  return (
    <>

      <Typography component="h2" variant="h6">
        Address
      </Typography>

      <Formik
        initialValues={initialValuesRef.current}
        validationSchema={addressCheckoutValidation}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {props => (
          <Form>

            <Grid container spacing={3} className='animate__animated animate__fadeIn'>

              {/* First Name Field */}
              <Grid item xs={12} sm={6}>
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
              </Grid>

              {/* Last Name Field */}
              <Grid item xs={12} sm={6}>
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
              </Grid>

              {/* Age Field */}
              <Grid item xs={12} sm={6}>
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
              </Grid>

              {/* Country Field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="country"
                  name="country"
                  autoComplete="country"        
                  label="Country"
                  value={props.values.country}
                  onChange={props.handleChange}
                  error={props.touched.country && Boolean(props.errors.country)}
                  helperText={props.touched.country && props.errors.country}
                />
              </Grid>

              {/* Locality Field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="locality"
                  name="locality"
                  autoComplete="locality"        
                  label="Locality"
                  value={props.values.locality}
                  onChange={props.handleChange}
                  error={props.touched.locality && Boolean(props.errors.locality)}
                  helperText={props.touched.locality && props.errors.locality}
                />
              </Grid>

              {/* Administrative Area Field */}
              {/*<TextField
                margin="normal"
                required
                fullWidth
                id="administrativeArea"
                name="administrativeArea"
                autoComplete="administrativeArea"        
                label="administrativeArea"
                value={props.values.administrativeArea}
                onChange={props.handleChange}
                error={props.touched.administrativeArea && Boolean(props.errors.administrativeArea)}
                helperText={props.touched.administrativeArea && props.errors.administrativeArea}
              />*/}

              {/* Postal Code Field */}
              <Grid item xs={12} sm={6}>
                <TextField 
                  margin="normal"
                  required
                  fullWidth
                  id="postalCode"
                  name="postalCode"
                  autoComplete="postalCode"
                  label="Postal Code"
                  type="number"  
                  inputProps={{minLength: 4, maxLength: 6}} 
                  value={props.values.postalCode}
                  onChange={props.handleChange}
                  error={props.touched.postalCode && Boolean(props.errors.postalCode)}
                  helperText={props.touched.postalCode && props.errors.postalCode}      
                />
              </Grid>

              {/* Address Field */}
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="address"
                  name="address"
                  autoComplete="address"        
                  label="Address"
                  value={props.values.address}
                  onChange={props.handleChange}
                  error={props.touched.address && Boolean(props.errors.address)}
                  helperText={props.touched.address && props.errors.address}
                />
              </Grid>

              {/* Additional Info Field */}
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="additionalInfo"
                  name="additionalInfo"
                  autoComplete="additionalInfo"        
                  label="Additional Info"
                  value={props.values.additionalInfo}
                  onChange={props.handleChange}
                  error={props.touched.additionalInfo && Boolean(props.errors.additionalInfo)}
                  helperText={props.touched.additionalInfo && props.errors.additionalInfo}
                />
              </Grid>

              <Grid item xs={6}>
                <Button 
                  onClick={handleBack} 
                  sx={{ mt: 3, ml: 1 }}
                >
                  Back
                </Button>
              </Grid>

              <Grid item xs={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Next
                </Button>
              </Grid>
  
            </Grid>   

          </Form>
        )}
      </Formik>

    </>
  );
};

export default CheckoutPaymentForm;
