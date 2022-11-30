import * as Yup from 'yup';

import { AddressTypes } from '@core/constants/addresses'
import { initAddressValues, addressValidation } from '@core/constants/forms/addresses';
import { CheckoutAddresses } from '@core/types/checkout'

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
