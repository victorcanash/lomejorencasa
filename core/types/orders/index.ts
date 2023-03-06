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
  bigbuy: {
    id: string,
    status: string,
    shipping: {
      firstName: string,
      lastName: string,
      addressLine1: string,
      addressLine2: string,
      postalCode: string,
      locality: string,
      country: string,
      phone: string,
    },
    products: BigbuyOrderProduct[],
  },
  braintree: {
    amount: string,
    billing: {
      firstName: string,
      lastName: string,
      addressLine1: string,
      addressLine2: string,
      postalCode: string,
      locality: string,
      country: string,
    },
    creditCard: {
      cardType: string,
      last4: string,
    },
    paypalAccount: {
      payerEmail: string,
    },
  }
};

export type BigbuyOrderProduct = {
  id: string,
  reference: string,
  quantity: number,
  name: string,
  internalReference: string,
};

export type OrderContact = {
  orderId: string,
  guestUserEmail: string,
}

export type OrderFailedCreate = {
  locale: string,
  userId?: number,
  guestUserEmail?: string,
  braintreeTransactionId: string,
  shipping: UserAddress,
  products: GuestCartItem[],
};

export type OrderFailedSendEmail = {
  orderId: number,
  locale: string,
};
