import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { ManageActions } from '@core/constants/auth';
import { CartItem } from '@core/types/cart';
import { 
  createCartItem as createCartItemMW, 
  updateCartItem as updateCartItemMW, 
  deleteCartItem as deleteCartItemMW 
} from '@core/middlewares/cart';
import { getBackendErrorMsg, logBackendError } from '@core/utils/errors';

export const manageCartItem = (action: ManageActions, token: string, cartItem: CartItem) => {
  return new Promise<{cartItem: CartItem}>(async (resolve, reject) => {
    let promiseMW = createCartItemMW;
    let successStatus = StatusCodes.CREATED;
    let errorTitle = 'Create Cart Item ERROR';
    if (action == ManageActions.update) {
      promiseMW = updateCartItemMW;
      errorTitle = 'Update Cart Item ERROR';
    } else if (action == ManageActions.delete) {
      promiseMW = deleteCartItemMW;
      successStatus = StatusCodes.OK;
      errorTitle = 'Delete Cart Item ERROR';
    }

    promiseMW(token, cartItem)
      .then(async (response: AxiosResponse) => {
        if (response.status === successStatus) {
          resolve({
            cartItem: response.data.cartItem,
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg(errorTitle, error);
        logBackendError(errorMsg)
        reject(new Error(errorMsg));
      }); 
  });
};
