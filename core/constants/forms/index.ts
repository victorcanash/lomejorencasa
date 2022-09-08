import * as Yup from 'yup';

import { FormLogin, FormRegister } from '@core/types/forms';
import { subtractYears } from '@core/utils/dates';

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
      .required('You must confirm your password'),
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
    birthday: Yup
      .date()
      .max(subtractYears(6), 'You must be over 6 years old')
      .typeError('Birthday must be a valid date')
      .nullable()
      .required('Birthday is required'),
  }
);

export const initRegisterValues: FormRegister = { 
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirm: '',
  birthday: subtractYears(18),
};

export const updateUserValidation = Yup.object().shape(
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
    birthday: Yup
      .date()
      .max(subtractYears(6), 'You must be over 6 years old')
      .typeError('Birthday must be a valid date')
      .nullable()
      .required('Birthday is required'),
  }
);
