import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import axios, { getAuthHeaders } from '@core/config/axios.config';
import { ManageActions } from '@core/constants/auth';
import { Cart, CartItem } from '@core/types/cart';
import { getBackendErrorMsg, logBackendError } from '@core/utils/errors';

export const checkCart = (token: string, cart: Cart) => {
  return new Promise<{cart: Cart, changedItemsByInventory: CartItem[]}>(async (resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: getAuthHeaders(token),
    };
    axios.put(`/carts/${cart.id}/check`, undefined, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED) {
          resolve({
            cart: response.data.cart,
            changedItemsByInventory: response.data.changedItemsByInventory,
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Check Cart ERROR', error);
        logBackendError(errorMsg)
        reject(new Error(errorMsg));
      }); 
  });
};

export const manageCartItem = (action: ManageActions, token: string, cartItem: CartItem) => {
  return new Promise<{cartItem: CartItem}>(async (resolve, reject) => {
    let promiseMW = createCartItem;
    let successStatus = StatusCodes.CREATED;
    let errorTitle = 'Create Cart Item ERROR';
    if (action == ManageActions.update) {
      promiseMW = updateCartItem;
      errorTitle = 'Update Cart Item ERROR';
    } else if (action == ManageActions.delete) {
      promiseMW = deleteCartItem;
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

const createCartItem = (token: string, cartItem: CartItem) => {
  const options: AxiosRequestConfig = {
    headers: getAuthHeaders(token),
  };
  return axios.post('/cart-items', cartItem, options);
}

const updateCartItem = (token: string, cartItem: CartItem) => {
  const options: AxiosRequestConfig = {
    headers: getAuthHeaders(token),
  };
  return axios.put(`/cart-items/${cartItem.id}`, cartItem, options);
}

const deleteCartItem = (token: string, cartItem: CartItem) => {
  const options: AxiosRequestConfig = {
    headers: getAuthHeaders(token),
  };
  return axios.delete(`/cart-items/${cartItem.id}`, options);
}
