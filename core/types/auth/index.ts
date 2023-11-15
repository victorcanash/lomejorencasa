import { type Dayjs } from 'dayjs'

export interface AuthLogin {
  email: string
  password: string
  remember: boolean
}

export interface AuthRegister {
  email: string
  password: string
  confirm: string
  firstName: string
  lastName: string
  birthday: Date | Dayjs
  getEmails: boolean
  acceptPolicy: boolean
}

export interface AuthUpdateEmail {
  password: string
  newEmail: string
}

export interface AuthResetPsw {
  newPassword: string
  newConfirm: string
}
