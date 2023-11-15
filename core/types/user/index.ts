import { type Providers } from '@core/constants/auth'
import { type AddressTypes, type CountryOptions } from '@core/constants/addresses'
import { type ContactTypes } from '@core/constants/contact'

export interface User {
  id: number
  email: string
  authProvider?: Providers
  firstName: string
  lastName: string
  birthday?: Date
  getEmails: boolean
  shipping?: UserAddress
  billing?: UserAddress
  orderExists?: boolean
}

export interface UserAddress {
  id: number
  userId: number
  type: AddressTypes
  firstName: string
  lastName: string
  addressLine1: string
  addressLine2?: string
  postalCode: string
  locality: string
  country: CountryOptions
}

export interface UserContact {
  type: ContactTypes
  email: string
  firstName: string
  orderId?: string
  comments: string
  acceptPolicy: boolean
}

export interface GuestUser {
  email?: string
}
