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
  birthday: Date,
};

export type FormUpdateEmail = {
  password: string,
  newEmail: string,
};

export type FormResetPassword = {
  newPassword: string,
  newConfirm: string,
}
