import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import axios, { getAuthHeaders, getLanguageHeaders } from '@core/config/axios.config';
import envConfig from '@core/config/env.config';
import { Storages } from '@core/constants/storage';
import { GuestCartKey } from '@core/constants/cart';
import type { CheckoutData } from '@core/types/checkout';
import type { Cart } from '@core/types/cart';
import { getBackendErrorMsg, logBackendError } from '@core/utils/errors';
import { convertCartToGuestCart } from '@core/utils/cart';
import { removeStorageItem } from '@core/utils/storage';

export const getPaypalUserToken = (token: string, currentLocale: string) => {
  return new Promise<{paypalUserToken: string}>((resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: {
        ...getLanguageHeaders(currentLocale),
        ...getAuthHeaders(token),
      },
    };
    axios.post('payments/paypal-user-token', undefined, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED && response.data) {
          resolve({
            paypalUserToken: response.data.paypalUserToken,
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Get Paypal User Token ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      });
  });
};

export const createPaypalTransaction = (token: string, currentLocale: string, checkoutData: CheckoutData, unloggedCart?: Cart) => {
  return new Promise<{paypalTransactionId: string}>(async (resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: {
        ...getAuthHeaders(token),
        ...getLanguageHeaders(currentLocale),
      },
    };
    const body = {
      checkoutData: {
        email: checkoutData.checkoutEmail,
        shipping: checkoutData.shipping,
        billing: checkoutData.billing,
        remember: checkoutData.remember,
        notes: checkoutData.notes,
      },
      guestCart: unloggedCart ? convertCartToGuestCart(unloggedCart) : undefined,
    };
    axios.post('/payments/paypal-transaction', body, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED && response.data) {
          resolve({
            paypalTransactionId: response.data.paypalTransactionId,
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch(async (error) => {
        const errorMsg = getBackendErrorMsg('Create Paypal Transaction ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      }); 
  })
};

export const capturePaypalTransaction = (token: string, currentLocale: string, checkoutData: CheckoutData, unloggedCart?: Cart) => {
  return new Promise<{paypalTransactionId: string}>(async (resolve, reject) => {
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
      checkoutData: {
        email: checkoutData.checkoutEmail,
        shipping: checkoutData.shipping,
        billing: checkoutData.billing,
        remember: checkoutData.remember,
        notes: checkoutData.notes,
      },
      guestCart: unloggedCart ? convertCartToGuestCart(unloggedCart) : undefined,
    };
    axios.post(`/payments/paypal-transaction/${checkoutData.orderId}`, body, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED && response.data) {
          await removeStorageItem(Storages.local, GuestCartKey);
          resolve({
            paypalTransactionId: response.data.paypalTransactionId,
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch(async (error) => {
        const errorMsg = getBackendErrorMsg('Capture Paypal Transaction ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      }); 
  })
};
