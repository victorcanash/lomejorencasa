import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { Dropin, PaymentMethodPayload } from 'braintree-web-drop-in';

import axios, { getAuthHeaders, getLanguageHeaders } from '@core/config/axios.config';
import envConfig from '@core/config/env.config';
import { Storages } from '@core/constants/storage';
import { GuestCartKey } from '@core/constants/cart';
import type { Page } from '@core/types/navigation';
import type { CheckoutPayment } from '@core/types/checkout';
import type { Order } from '@core/types/orders';
import type { GuestUser } from '@core/types/user';
import type { Cart, GuestCart } from '@core/types/cart';
import { getBackendErrorMsg, logBackendError } from '@core/utils/errors';
import { removeStorageItem } from '@core/utils/storage';

export const getBraintreeToken = (token?: string) => {
  return new Promise<{braintreeToken: string}>(async (resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: token ? getAuthHeaders(token) : undefined,
    };
    axios.get('/payments/braintree-token', options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.OK) {
          resolve({
            braintreeToken: response.data.braintreeToken,
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Get Braintree Token ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      }); 
  })
};

export const checkPaymentMethod = (dropin: Dropin) => {
  return new Promise<{paymentPayload: PaymentMethodPayload}>(async (resolve, reject) => {
    dropin.requestPaymentMethod((error: object | null, payload: PaymentMethodPayload) => {
      if (error) {
        const errorMsg = getBackendErrorMsg('Check Payment Method ERROR', error);
        logBackendError(errorMsg)
        reject(new Error(errorMsg));
      } else {
        resolve({
          paymentPayload: payload,
        })
      }
    });
  });
};

export const sendConfirmTransactionEmail = (currentLocale: string, checkoutPayment: CheckoutPayment, guestUser: GuestUser, cart: Cart, urlPage: Page) => {
  return new Promise<true>((resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: getLanguageHeaders(currentLocale),
      params: {
        appName: envConfig.NEXT_PUBLIC_APP_NAME,
        appDomain: envConfig.NEXT_PUBLIC_APP_URL,
        url: `${envConfig.NEXT_PUBLIC_APP_URL}${urlPage.path}`,
      }
    };
    const body = {
      paymentMethodNonce: checkoutPayment.methodPayload.nonce,
      guestUser,
      guestCart: {
        items: cart.items.map((item) => {
          return {
            inventoryId: item.inventoryId,
            quantity: item.quantity,
          }
        })
      } as GuestCart
    }
    axios.post('payments/send-email/transaction', body, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED) {
          resolve(true);
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Send Confirm Transaction Email ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      });
  })
};

export const createTransaction = (token: string | undefined, currentLocale: string, checkoutPayment: CheckoutPayment, guestUser?: GuestUser, cart?: Cart) => {
  return new Promise<{order?: Order}>(async (resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: token ? {
        ...getAuthHeaders(token),
        ...getLanguageHeaders(currentLocale),
      } : getLanguageHeaders(currentLocale),
      params: {
        appName: envConfig.NEXT_PUBLIC_APP_NAME,
        appDomain: envConfig.NEXT_PUBLIC_APP_URL,
      },
      timeout: 20000,
    };
    const body = !token && guestUser && cart ? {
      paymentMethodNonce: checkoutPayment.methodPayload.nonce,
      remember: checkoutPayment.remember,
      guestUser,
      guestCart: {
        items: cart.items.map((item) => {
          return {
            inventoryId: item.inventoryId,
            quantity: item.quantity,
          }
        })
      } as GuestCart
    } : {
      paymentMethodNonce: checkoutPayment.methodPayload.nonce,
      remember: checkoutPayment.remember,
    };
    axios.post('/payments/transaction', body, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED) {
          await removeStorageItem(Storages.local, GuestCartKey);
          resolve({
            order: response.data.order,
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch(async (error) => {
        const errorMsg = getBackendErrorMsg('Create Transaction ERROR', error);
        logBackendError(errorMsg);
        if (errorMsg.includes('Create bigbuy order error') || 
            errorMsg.includes('Get order info error')) {
          await removeStorageItem(Storages.local, GuestCartKey);
          resolve({});
        } else {
          reject(new Error(errorMsg));
        }
      }); 
  })
};
