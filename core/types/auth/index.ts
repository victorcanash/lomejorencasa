export type AuthLogin = {
  email: string,
  password: string,
};

export type AuthRegister = {
  email: string,
  password: string,
  confirm: string,
  firstName: string,
  lastName: string,
  birthday: Date,
};

export type AuthUpdateEmail = {
  password: string,
  newEmail: string,
};

export type AuthResetPassword = {
  newPassword: string,
  newConfirm: string,
}
