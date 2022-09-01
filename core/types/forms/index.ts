export type FormLogin = {
  email: string,
  password: string,
};

export type FormRegister = {
  email: string,
  password: string,
  confirm: string,
  firstName: string,
  lastName: string,
  age: number,
};

export type FormAddress = {
  address: string,
  additionalInfo: string,
  postalCode: string,
  locality: string,
  //administrativeArea: string,
  country: string,
};

export type FormCheckoutAddress = {
  firstName: string,
  lastName: string,
  age: number,
  address: string,
  additionalInfo: string,
  postalCode: string,
  locality: string,
  //administrativeArea: string,
  country: string,
};

export type FormPayment = {
  type: string,
  provider: string,
  accountNumber: string,
  expiry: Date,
};
