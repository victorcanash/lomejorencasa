import * as Yup from 'yup';

import { AddressTypes } from '@core/constants/addresses';
import { initAddressValues, addressValidation } from '@core/constants/forms/addresses';
import { OrderFailedCreate, OrderProductFailedCreate } from '@core/types/orders';

export const orderFailedCreateValidation = Yup.object().shape(
  {
    userId: Yup
      .number()
      .min(0, 'UserId must be at least 0')
      .required('UserId is required'),
    braintreeTransactionId: Yup
      .string()
      .min(1, 'BraintreeTransactionId must have 1 letter minimum')
      .required('BraintreeTransactionId is required'),
    shipping: addressValidation,
  }
);

export const initOrderFailedCreateValues: OrderFailedCreate = {
  userId: 0,
  braintreeTransactionId: '',
  shipping: {
    ...initAddressValues,
    type: AddressTypes.SHIPPING,
  },
  products: [],
}

export const orderProductFailedCreateValidation = Yup.object().shape(
  {
    quantity: Yup
      .number()
      .min(1, 'Quantity must be at least 1')
      .required('Quantity is required'),
    inventoryId: Yup
      .number()
      .min(0, 'InventoryID must be at least 0')
      .required('InventoryID is required'),
  }
);

export const initOrderProductFailedCreateValues: OrderProductFailedCreate = {
  quantity: 1,
  inventoryId: 0,
}

export const sendFailedOrderEmailValidation = Yup.object().shape(
  {
    orderId: Yup
      .number()
      .min(0, 'OrderID must be at least 0')
      .required('OrderID is required'),
  }
);

export const initSendFailedOrderEmailValues = {
  orderId: 0,
};
