import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { Dropin, PaymentMethodPayload } from 'braintree-web-drop-in';

import axios, { getAuthHeaders } from '@core/config/axios.config';
import { getBackendErrorMsg, logBackendError } from '@core/utils/errors';

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

export const createTransaction = (token: string, paymentMethodNonce: string) => {
  return new Promise<{transactionId: string, braintreeToken: string}>(async (resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: getAuthHeaders(token),
    };
    axios.post('/payments/transaction', { paymentMethodNonce }, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED) {
          resolve({
            transactionId: response.data.transactionId,
            braintreeToken: response.data.braintreeToken,
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Create Transaction ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      }); 
  })
};
