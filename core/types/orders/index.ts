import type { UserAddress } from '@core/types/user';
import type { GuestCartCheckItem, GuestCartItem } from '@core/types/cart';

export type Order = {
  id: number,
  userId?: number,
  guestUserId?: number,
  paypalTransactionId?: string,
  bigbuyId?: string,
  createdAt: Date,
  items?: GuestCartCheckItem[],
  bigbuy: OrderBigbuy,
  transaction: OrderTransaction,
  notes?: string,
};

export type OrderBigbuy = {
  id: string,
  status: string,
  shippingAddress: {
    firstName: string,
    lastName: string,
    country: string,
    postcode: string,
    town: string,
    address: string,
    phone: string,
    email: string,
    companyName: string,
  },
  products: OrderBigbuyProduct[],
  tracking?: OrderBigbuyTracking,
};

export type OrderBigbuyProduct = {
  id?: string,
  reference: string,
  quantity: number,
  name?: string,
  internalReference: string,
};

export type OrderBigbuyTracking = {
  trackingNumber: string,
  statusDescription: string,
};

export type OrderTransaction = {
  amount: {
    currencyCode: string,
    value: string,
    breakdown: {
      itemTotal: {
        currencyCode: string,
        value: string,
      },
      taxTotal: {
        currencyCode: string,
        value: string,
      },
      discount: {
        currencyCode: string,
        value: string,
      },
      shipping: {
        currencyCode: string,
        value: string,
      },
    },
  },
  billing: {
    firstName: string,
    lastName: string,
    country: string,
    postalCode: string,
    locality: string,
    addressLine1: string,
    addressLine2: string,
  },
  creditCard: {
    cardType: string,
    last4: string,
  },
  paypalAccount: {
    payerEmail: string,
  },
};

export type OrderContact = {
  orderId: string,
  guestUserEmail: string,
};

export type OrderFailedCreate = {
  locale: string,
  paypalTransactionId: string,
  checkoutEmail: string,
  notes?: string,
  shipping: UserAddress,
  products: GuestCartItem[],
};

export type OrderFailedSendEmail = {
  orderId: number,
  locale: string,
};
