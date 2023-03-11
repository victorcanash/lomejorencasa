import type { UserAddress } from '@core/types/user';
import type { GuestCartCheckItem, GuestCartItem } from '@core/types/cart';

export type Order = {
  id: number,
  userId?: number,
  guestUserId?: number,
  braintreeTransactionId?: string,
  paypalTransactionId?: string,
  bigbuyId?: string,
  createdAt: Date,
  items?: GuestCartCheckItem[],
  bigbuy: OrderBigbuy,
  transaction: OrderTransaction,
};

export type OrderBigbuy = {
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
}

export type OrderBigbuyProduct = {
  id?: string
  reference: string
  quantity: number
  name?: string
  internalReference: string
};

export type OrderTransaction = {
  amount: string
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

export type OrderContact = {
  orderId: string,
  guestUserEmail: string,
}

export type OrderFailedCreate = {
  locale: string,
  userId?: number,
  guestUserEmail?: string,
  braintreeTransactionId?: string,
  paypalTransactionId?: string,
  shipping: UserAddress,
  products: GuestCartItem[],
};

export type OrderFailedSendEmail = {
  orderId: number,
  locale: string,
};
