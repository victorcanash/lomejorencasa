import { type UserAddress } from '@core/types/user'

export interface CheckoutContact {
  shipping?: UserAddress
  billing?: UserAddress
  sameAsShipping?: boolean
  checkoutEmail?: string
  notes?: string
}

export interface CheckoutPayment {
  orderId: string
  card?: {
    lastFour?: string
    type?: string
    holderName?: string
  }
  paypal?: {
    email: string
  }
  remember?: boolean
}

export type CheckoutData = CheckoutContact & CheckoutPayment
