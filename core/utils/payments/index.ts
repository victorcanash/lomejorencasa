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
import type { Cart, GuestCartCheck } from '@core/types/cart';
import { getBackendErrorMsg, logBackendError } from '@core/utils/errors';
import { convertCartToGuestCart, convertGuestCartCheckToCart, setGuestCart } from '@core/utils/cart';
import { removeStorageItem } from '@core/utils/storage';

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
      paymentPayload: checkoutPayment.methodPayload,
      guestUser: guestUser,
      guestCart: convertCartToGuestCart(cart),
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

export const getGuestUserData = async (confirmationToken: string) => {
  return new Promise<{checkoutPayment: CheckoutPayment, user: GuestUser, cart: Cart}>((resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: getAuthHeaders(confirmationToken),
    };
    axios.get('/payments/guest-user-data', options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.OK) {
          await setGuestCart(response.data.guestCart as GuestCartCheck);
          resolve({
            checkoutPayment: {
              methodPayload: response.data.paymentPayload,
              remember: false,
            },
            user: response.data.guestUser,
            cart: convertGuestCartCheckToCart(response.data.guestCart as GuestCartCheck),
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Get Guest User Data ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      });
  })
};

export const createTransaction = (token: string, currentLocale: string, checkoutPayment: CheckoutPayment, guestUser?: GuestUser, cart?: Cart) => {
  return new Promise<{order?: Order}>(async (resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: {
        ...getAuthHeaders(token),
        ...getLanguageHeaders(currentLocale),
      },
      params: {
        appName: envConfig.NEXT_PUBLIC_APP_NAME,
        appDomain: envConfig.NEXT_PUBLIC_APP_URL,
      },
      timeout: 20000,
    };
    const body = {
      paymentMethodNonce: checkoutPayment.methodPayload.nonce,
      remember: checkoutPayment.remember,
      guestUser: guestUser,
      guestCart: cart ? convertCartToGuestCart(cart) : undefined,
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
