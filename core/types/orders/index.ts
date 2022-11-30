import { ProductInventory } from '@core/types/products';
import { UserAddress } from '@core/types/user';

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
      addressLine1: string,
      addressLine2: string,
      postalCode: string,
      locality: string,
      country: string,
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

export type OrderFailedCreate = {
  userId: number,
  braintreeTransactionId: string,
  shipping: UserAddress,
  products: OrderProductFailedCreate[],
};

export type OrderProductFailedCreate = {
  quantity: number,
  inventoryId: number,
}
