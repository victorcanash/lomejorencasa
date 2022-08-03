import * as Yup from 'yup';

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

export const initLoginValues = {
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
    age: Yup.number()
      .min(10, 'You must be over 10 years old')
      .required('Age is required')
  }
);

export const initRegisterValues = { 
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirm: '',
  age: 18
};

export const JWTTokenKey = 'sessionJWTToken';
