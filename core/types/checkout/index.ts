import { PaymentMethodPayload } from 'braintree-web-drop-in';

import { UserAddress } from '@core/types/user';

export type CheckoutAddresses = {
  shipping: UserAddress,
  billing: UserAddress,
  sameAsShipping: boolean,
};

export type CheckoutPayment = {
  methodPayload: PaymentMethodPayload,
  remember: boolean,
};
