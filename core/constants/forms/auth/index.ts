import * as Yup from 'yup';

import { AuthLogin, AuthRegister } from '@core/types/auth';
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

export const initLoginValues: AuthLogin = {
  email: '',
  password: '',
};

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

export const initRegisterValues: AuthRegister = { 
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirm: '',
  birthday: subtractYears(18),
};

export const sendEmailValidation = Yup.object().shape(
  {
    email: Yup
      .string()
      .email('Invalid email format')
      .required('Email is required'),
  }
);

export const updateEmailValidation = Yup.object().shape(
  {
    password: Yup
      .string()
      .min(8, 'Password too short')
      .required('Password is required'),
    newEmail: Yup
      .string()
      .email('Invalid new email format')
      .required('New email is required'),
  }
);

export const resetPasswordValidation = Yup.object().shape(
  {
    newPassword: Yup
      .string()
      .min(8, 'New password too short')
      .required('New password is required'),
    newConfirm: Yup
      .string()
      .when("newPassword", {
          is: (value: string) => (value && value.length > 0 ? true : false),
          then: Yup.string().oneOf(
              [Yup.ref("newPassword")], 'New passwords must match'
          )
      })
      .required('You must confirm your new password'),
  }
);
