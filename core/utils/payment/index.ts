import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { createTransaction as createTransactionMW } from '@core/middlewares/payment';
import { getBackendErrorMsg, logBackendError } from '@core/utils/errors';

export const createTransaction = (token: string, paymentMethodNonce: string) => {
  return new Promise<{transaction: any}>(async (resolve, reject) => {
    createTransactionMW(token, paymentMethodNonce)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED && response.data?.transaction) {
          resolve({
            transaction: response.data.transaction
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
