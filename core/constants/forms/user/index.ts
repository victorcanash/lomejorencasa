import * as Yup from 'yup';

import { subtractYears } from '@core/utils/dates';

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
