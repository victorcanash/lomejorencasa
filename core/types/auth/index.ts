import { Dayjs } from 'dayjs';

export type AuthLogin = {
  email: string,
  password: string,
  remember: boolean,
};

export type AuthRegister = {
  email: string,
  password: string,
  confirm: string,
  firstName: string,
  lastName: string,
  birthday: Date | Dayjs,
  getEmails: boolean,
  acceptPolicy: boolean,
};

export type AuthUpdateEmail = {
  password: string,
  newEmail: string,
};

export type AuthResetPsw = {
  newPassword: string,
  newConfirm: string,
}
