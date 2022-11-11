import { UserAddress } from '@core/types/user';

export type CheckoutAddresses = {
  shipping: UserAddress,
  billing: UserAddress,
  sameAsShipping: boolean,
};
