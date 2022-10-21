import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { 
  checkoutOrder as checkoutOrderMW, 
  captureOrder as captureOrderMW 
} from '@core/middlewares/paypal';
import { getBackendErrorMsg, logBackendError } from '@core/utils/errors';

export const checkoutOrder = (token: string) => {
  return new Promise<{checkoutUrl: string}>(async (resolve, reject) => {
    checkoutOrderMW(token)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED && response.data?.checkoutUrl) {
          resolve({
            checkoutUrl: response.data.checkoutUrl
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

export const captureOrder = (token: string, orderToken: string) => {
  return new Promise<{data: any}>(async (resolve, reject) => {
    captureOrderMW(token, orderToken)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED && response.data?.data) {
          resolve({
            data: response.data.data
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Capture Order ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      }); 
  })
};
