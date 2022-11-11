import * as Yup from 'yup';

import { AddressTypes, CountryOptions } from '@core/constants/addresses'
import { UserAddress } from '@core/types/user'
import { CheckoutAddresses } from '@core/types/checkout'

export const addressValidation = Yup.object().shape(
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
    addressLine1: Yup
      .string()
      .min(3, 'Address line 1 must have 3 letters minimum')
      .max(200, 'Address line 1 must have maximum 200 letters')
      .required('Last name is required'),
    addressLine2: Yup
      .string()
      .min(3, 'Address line 2 must have 3 letters minimum')
      .max(200, 'Address line 2 must have maximum 200 letters'),
    postalCode: Yup
      .string()
      .min(5, 'Postal code must have 5 letters minimum')
      .max(7, 'Postal code 1 must have maximum 7 letters')
      .required('Postal code is required'),
    locality: Yup
      .string()
      .min(3, 'Locality must have 3 letters minimum')
      .max(30, 'Locality must have maximum 30 letters')
      .required('Locality is required'),
    country: Yup
      .string()
      .min(3, 'Country must have 3 letters minimum')
      .max(30, 'Country must have maximum 30 letters')
      .required('Country is required'),
  }
);

export const initAddressValues: UserAddress = {
  id: -1,
  userId: -1,
  type: AddressTypes.SHIPPING,
  firstName: '',
  lastName: '',
  addressLine1: '',
  addressLine2: '',
  postalCode: '',
  locality: '',
  country: CountryOptions.ES,
};

export const checkoutAddressesValidation = Yup.object().shape(
  {
    shipping: addressValidation,
    billing: Yup
      .object().when('sameAsShipping', {
        is: (sameAsShipping: boolean) => !sameAsShipping,
        then: addressValidation,
      }),
    sameAsShipping: Yup
      .boolean(),
  }
);

export const initCheckoutAddressesValues: CheckoutAddresses = {
  shipping: {
    ...initAddressValues,
    type: AddressTypes.SHIPPING,
  },
  billing: {
    ...initAddressValues,
    type: AddressTypes.BILLING,
  },
  sameAsShipping: false,
};
