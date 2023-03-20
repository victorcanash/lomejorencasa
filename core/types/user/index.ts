import { Providers } from '@core/constants/auth';
import { AddressTypes, CountryOptions } from '@core/constants/addresses'
import { ContactTypes } from '@core/constants/contact';

export type User = {
  id: number,
  email: string,
  authProvider?: Providers,
  firstName: string,
  lastName: string,
  birthday?: Date,
  getEmails: boolean,
  shipping?: UserAddress,
  billing?: UserAddress,
  orderExists?: boolean,
};

export type UserAddress = {
  id: number,
  userId: number,
  type: AddressTypes,
  firstName: string,
  lastName: string,
  addressLine1: string,
  addressLine2?: string,
  postalCode: string,
  locality: string,
  country: CountryOptions,
};

export type UserContact = {
  type: ContactTypes,
  email: string,
  firstName: string,
  orderId?: string,
  comments: string,
};

export type GuestUser = {
  email?: string,
  shipping?: UserAddress,
  billing?: UserAddress,
}
