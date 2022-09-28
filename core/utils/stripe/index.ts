import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { createCheckoutSession } from '@core/middlewares/stripe';
import { getBackendErrorMsg, logBackendError } from '@core/utils/errors';

export const addCheckoutSession = (token: string) => {
  return new Promise<{sessionId: string}>(async (resolve, reject) => {
    createCheckoutSession(token)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED && response.data?.sessionId) {
          resolve({
            sessionId: response.data.sessionId
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Create Checkout Session ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      }); 
  })
};
