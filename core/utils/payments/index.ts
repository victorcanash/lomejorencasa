import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { Dropin, PaymentMethodPayload } from 'braintree-web-drop-in';

import { createTransaction as createTransactionMW } from '@core/middlewares/payments';
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
  return new Promise<{transaction: any, braintreeToken: string}>(async (resolve, reject) => {
    createTransactionMW(token, paymentMethodNonce)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED) {
          resolve({
            transaction: response.data.transaction,
            braintreeToken: response.data.braintreeToken,
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Checkout Order ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      }); 
  })
};
