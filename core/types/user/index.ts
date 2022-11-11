import { AddressTypes, CountryOptions } from '@core/constants/addresses'

export type User = {
  id: number,
  email: string,
  firstName: string,
  lastName: string,
  birthday: Date,
  shipping?: UserAddress,
  billing?: UserAddress,
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
