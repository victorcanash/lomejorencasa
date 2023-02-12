import { ProductInventory } from '@core/types/products';
import { UserAddress } from '@core/types/user';
import { GuestCartItem } from '@core/types/cart';

export type Order = {
  id: number,
  userId?: number,
  guestUserId?: number,
  braintreeTransactionId: string,
  bigbuyId?: string,
  createdAt: Date,
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
    products: OrderItem[],
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

export type OrderItem = {
  id: string,
  reference: string,
  quantity: number,
  name: string,
  inventory: ProductInventory | null,
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