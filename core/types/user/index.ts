export type User = {
  id: number,
  email: string,
  firstName: string,
  lastName: string,
  age: number,
  addresses: UserAddress[],
  payments: UserPayment[],
}

export type UserAddress = {
  id: number,
  userId: number,
  addressLine: string,
  additionalInfo: string,
  postalCode: string,
  locality: string,
  administrativeArea: string,
  country: string,
  type?: string,
}

export type UserPayment = {
  id: number,
  userId: number,
  type: string,
  provider: string,
  accountNumber: string,
  expiry: Date,
}
