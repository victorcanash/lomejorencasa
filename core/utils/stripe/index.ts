import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { createCheckoutSession as createCheckoutSessionMW } from '@core/middlewares/stripe';
import { getBackendErrorMsg } from '@core/utils/errors';

export const createCheckoutSession = (token: string) => {
  return new Promise<{sessionId: string}>(async (resolve, reject) => {
    createCheckoutSessionMW(token)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED && response.data?.sessionId) {
          resolve({
            sessionId: response.data.sessionId
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg(error);
        console.error(`[Create Checkout Session ERROR]: ${errorMsg}`);
        reject(new Error(errorMsg));
      }); 
  })
};
