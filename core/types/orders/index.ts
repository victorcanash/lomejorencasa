import { type OrderEmailTypes } from '@core/constants/admin'
import type { UserAddress } from '@core/types/user'
import type { GuestCartCheckItem, GuestCartItem } from '@core/types/cart'

export interface Order {
  id: number
  userId?: number
  guestUserId?: number
  paypalTransactionId?: string
  bigbuyId?: string
  createdAt: Date
  items?: GuestCartCheckItem[]
  bigbuy: OrderBigbuy
  transaction: OrderTransaction
  notes?: string
}

export interface OrderBigbuy {
  id: string
  status: string
  shippingAddress: {
    firstName: string
    lastName: string
    country: string
    postcode: string
    town: string
    address: string
    phone: string
    email: string
    companyName: string
  }
  products: OrderBigbuyProduct[]
  tracking?: OrderBigbuyTracking
}

export interface OrderBigbuyProduct {
  id?: string
  reference: string
  quantity: number
  name?: string
  internalReference: string
}

export interface OrderBigbuyTracking {
  trackingNumber: string
  statusDescription: string
}

export interface OrderTransaction {
  amount: {
    currencyCode: string
    value: string
    breakdown: {
      itemTotal: {
        currencyCode: string
        value: string
      }
      taxTotal: {
        currencyCode: string
        value: string
      }
      discount: {
        currencyCode: string
        value: string
      }
      shipping: {
        currencyCode: string
        value: string
      }
    }
  }
  billing: {
    firstName: string
    lastName: string
    country: string
    postalCode: string
    locality: string
    addressLine1: string
    addressLine2: string
  }
  creditCard: {
    cardType: string
    last4: string
  }
  paypalAccount: {
    payerEmail: string
  }
}

export interface OrderContact {
  orderId: string
  guestUserEmail: string
}

export interface OrderFailedCreate {
  locale: string
  paypalTransactionId: string
  checkoutEmail: string
  notes?: string
  shipping: UserAddress
  products: GuestCartItem[]
  currency: string
}

export interface OrderSendEmail {
  bigbuyId: string
  locale: string
  emailType: OrderEmailTypes
}

export interface OrderFailedSendEmail {
  orderId: number
  locale: string
  currency: string
}
