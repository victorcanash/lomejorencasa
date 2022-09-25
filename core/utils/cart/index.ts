import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { /*Cart,*/ CartItem } from '@core/types/cart';
import { /*createCart as createCartMW,*/ createCartItem as createCartItemMW, updateCartItem as updateCartItemMW, deleteCartItem as deleteCartItemMW } from '@core/middlewares/cart';
import { getBackendErrorMsg } from '@core/utils/errors';

/*export const createCart = (token: string) => {
  return new Promise<{cart: Cart}>(async (resolve, reject) => {
    createCartMW(token)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED && response.data?.cart) {
          resolve({
            cart: response.data.cart
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg(error);
        console.error(`[Create Cart ERROR]: ${errorMsg}`);
        reject(new Error(errorMsg));
      }); 
  })
};*/

export const createCartItem = (token: string, cartItem: CartItem) => {
  return new Promise<{cartItem: CartItem}>(async (resolve, reject) => {
    createCartItemMW(token, cartItem)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED && response.data?.cartItem) {
          resolve({
            cartItem: response.data.cartItem
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg(error);
        console.error(`[Create Cart Item ERROR]: ${errorMsg}`);
        reject(new Error(errorMsg));
      }); 
  })
};

export const updateCartItem = (token: string, cartItem: CartItem) => {
  return new Promise<{cartItem: CartItem}>(async (resolve, reject) => {
    updateCartItemMW(token, cartItem)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED && response.data?.cartItem) {
          resolve({
            cartItem: response.data.cartItem
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg(error);
        console.error(`[Update Cart Item ERROR]: ${errorMsg}`);
        reject(new Error(errorMsg));
      }); 
  })
};

export const deleteCartItem = (token: string, id: number) => {
  return new Promise<boolean>(async (resolve, reject) => {
    deleteCartItemMW(token, id)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.OK) {
          resolve(true);
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg(error);
        console.error(`[Delete Cart Item ERROR]: ${errorMsg}`);
        reject(new Error(errorMsg));
      }); 
  })
};
