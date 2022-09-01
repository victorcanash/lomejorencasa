import * as Yup from 'yup';

import { FormLogin, FormRegister, FormAddress, FormPayment } from '@core/types/forms';

export const loginValidation = Yup.object().shape(
  {
    email: Yup
      .string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup
      .string()
      .min(8, 'Password too short')
      .required('Password is required'),
  }
);

export const initLoginValues: FormLogin = {
  email: '',
  password: '',
}

export const registerValidation = Yup.object().shape(
  {
    firstName: Yup
      .string()
      .min(3, 'First name must have 3 letters minimum')
      .max(12, 'First name must have maximum 12 letters')
      .required('First name is required'),
    lastName: Yup
      .string()
      .min(3, 'Last name must have 3 letters minimum')
      .max(12, 'Last name must have maximum 12 letters')
      .required('Last name is required'),
    email: Yup
      .string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup
      .string()
      .min(8, 'Password too short')
      .required('Password is required'),
    confirm: Yup
      .string()
      .when("password", {
          is: (value: string) => (value && value.length > 0 ? true : false),
          then: Yup.string().oneOf(
              [Yup.ref("password")], 'Passwords must match'
          )
      })
      .required('You mus confirm your password'),
    age: Yup
      .number()
      .min(10, 'You must be over 10 years old')
      .required('Age is required')
  }
);

export const initRegisterValues: FormRegister = { 
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirm: '',
  age: 18
};

export const addressCheckoutValidation = Yup.object().shape(
  {
    firstName: Yup
      .string()
      .min(3, 'First name must have 3 letters minimum')
      .max(12, 'First name must have maximum 12 letters')
      .required('First name is required'),
    lastName: Yup
      .string()
      .min(3, 'Last name must have 3 letters minimum')
      .max(12, 'Last name must have maximum 12 letters')
      .required('Last name is required'),
    age: Yup
      .number()
      .min(10, 'You must be over 10 years old')
      .required('Age is required'),
    address: Yup
      .string()
      .min(3, 'Address must have 3 letters minimum')
      .required('Address is required'),
    additionalInfo: Yup
      .string(),
    postalCode: Yup
      .string()
      .min(4, 'Postal code must have 4 characters minimum')
      .max(6, 'Postal code must have maximum 6 characters'),
    locality: Yup
      .string()
      .min(3, 'Locality must have 3 letters minimum')
      .required('Locality is required'),
    /*administrativeArea: Yup
      .string()
      .min(3, 'Administrative area must have 3 letters minimum')
      .required('Administrative area is required'),*/
    country: Yup
      .string()
      .min(3, 'Country must have 3 letters minimum')
      .required('Country is required'),
  }
);

export const initAddressValues: FormAddress = { 
  address: '',
  additionalInfo: '',
  postalCode: '',
  locality: '',
  //administrativeArea: '',
  country: '',
};

export const paymentValidation = Yup.object().shape(
  {
    type: Yup
      .string()
      .min(3, 'Type must have 3 letters minimum')
      .required('Type is required'),
    provider: Yup
      .string()
      .min(3, 'Provider must have 3 letters minimum')
      .required('Provider is required'),
    accountNumber: Yup
      .string()
      .min(3, 'Account number must have 3 letters minimum')
      .required('Account number is required'),
    expiry: Yup
      .date()
      .required('Expiry date is required'),
  }
);

export const initPaymentValues: FormPayment = {
  type: '',
  provider: '',
  accountNumber: '',
  expiry: new Date(),
};
