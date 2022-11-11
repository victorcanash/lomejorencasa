import { ChangeEvent } from 'react';

import { FormikErrors, FormikTouched } from 'formik';

import TextField from '@mui/material/TextField';

import { CountryOptions } from '@core/constants/addresses'
import { UserAddress } from '@core/types/user';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type AddressFormProps = {
  autoFocus: boolean,
  values: UserAddress,
  errors?: FormikErrors<UserAddress>,
  touched?: FormikTouched<UserAddress>,
  handleChange: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: ChangeEvent<any>): void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any> ? void : (e: string | ChangeEvent<any>) => void;
  },
};

const AddressForm = (props: AddressFormProps) => {
  const getAddressType = () => {
    return props.values.type;
  };
  
  return (
    <>

      {/* First Name Field */}
      <TextField
        margin="normal"
        required
        fullWidth
        id={`${getAddressType()}.firstName`}
        name={`${getAddressType()}.firstName`}
        autoComplete="firstName"        
        label="First Name"
        autoFocus={props.autoFocus}
        value={props.values.firstName}
        onChange={props.handleChange}
        error={props.touched?.firstName && Boolean(props.errors?.firstName)}
        helperText={props.touched?.firstName && props.errors?.firstName}
      />

      {/* Last Name Field */}
      <TextField
        margin="normal"
        required
        fullWidth
        id={`${getAddressType()}.lastName`}
        name={`${getAddressType()}.lastName`}
        autoComplete="lastName"        
        label="Last Name"
        value={props.values.lastName}
        onChange={props.handleChange}
        error={props.touched?.lastName && Boolean(props.errors?.lastName)}
        helperText={props.touched?.lastName && props.errors?.lastName}
      />

      {/* Address Line 1 Field */}
      <TextField
        margin="normal"
        required
        fullWidth
        id={`${getAddressType()}.addressLine1`}
        name={`${getAddressType()}.addressLine1`}
        autoComplete="addressLine1"        
        label="Address Line 1"
        value={props.values.addressLine1}
        onChange={props.handleChange}
        error={props.touched?.addressLine1 && Boolean(props.errors?.addressLine1)}
        helperText={props.touched?.addressLine1 && props.errors?.addressLine1}
      />

      {/* Address Line 2 Field */}
      <TextField
        margin="normal"
        fullWidth
        id={`${getAddressType()}.addressLine2`}
        name={`${getAddressType()}.addressLine2`}
        autoComplete="addressLine2"        
        label="Address Line 2"
        value={props.values.addressLine2}
        onChange={props.handleChange}
        error={props.touched?.addressLine2 && Boolean(props.errors?.addressLine2)}
        helperText={props.touched?.addressLine2 && props.errors?.addressLine2}
      />

      {/* Postal Code Field */}
      <TextField
        margin="normal"
        required
        fullWidth
        id={`${getAddressType()}.postalCode`}
        name={`${getAddressType()}.postalCode`}
        autoComplete="postalCode"        
        label="Postal Code"
        value={props.values.postalCode}
        onChange={props.handleChange}
        error={props.touched?.postalCode && Boolean(props.errors?.postalCode)}
        helperText={props.touched?.postalCode && props.errors?.postalCode}
      />

      {/* Locality Field */}
      <TextField
        margin="normal"
        required
        fullWidth
        id={`${getAddressType()}.locality`}
        name={`${getAddressType()}.locality`}
        autoComplete="city"        
        label="Locality"
        value={props.values.locality}
        onChange={props.handleChange}
        error={props.touched?.locality && Boolean(props.errors?.locality)}
        helperText={props.touched?.locality && props.errors?.locality}
      />

      {/* Country Field */}
      <InputLabel id="country-select-label">Country</InputLabel>
      <Select
        labelId="country-select-label"
        required
        fullWidth
        id={`${getAddressType()}.country`}
        name={`${getAddressType()}.country`}
        value={props.values.country}
        onChange={props.handleChange}
        error={props.touched?.country && Boolean(props.errors?.country)}
      >
        { Object.values(CountryOptions).map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>

    </>
  );
};

export default AddressForm;
