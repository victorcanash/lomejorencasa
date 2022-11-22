import { ProductInventory } from '@core/types/products';

export type Order = {
  id: number,
  userId: number,
  braintreeTransactionId: string,
  createdAt: Date,
  bigbuy: {
    id: number,
    status: string,
    shipping: {
      firstName: string,
      lastName: string,
      country: string,
      postalCode: string,
      locality: string,
      addressLine1: string,
      addressLine2: string,
      phone: string,
    },
    products: {
      id: string
      reference: string
      quantity: number
      name: string
      inventory: ProductInventory | null
    }[],
  },
  braintree: {
    amount: string,
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
  }
};
