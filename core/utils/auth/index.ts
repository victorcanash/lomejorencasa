import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { JWTTokenKey } from '@core/constants/auth';
import { Storages } from '@core/constants/storage';
import type { User, AuthLogin, AuthRegister } from '@core/types/auth';
import type { Cart } from '@core/types/cart';
import { getStorageItem, setStorageItem, removeStorageItem } from '@core/utils/storage';
import { logged, login, register, logout, update } from '@core/middlewares/auth';
import { capitalizeFirstLetter } from '@core/utils/strings';

export const getCredentials = async () => {
  return new Promise<{token: string, user: User, cart: Cart}>(async (resolve, reject) => {
    const token = await getStorageItem(Storages.local, JWTTokenKey) || '';
    logged(token).then(async (response: AxiosResponse) => {
      if (response.status === StatusCodes.OK && response.data?.user) {
        if (!response.data?.user.lockedOut) {
          resolve({
            token: token,
            user: response.data.user,
            cart: response.data.user.cart,
          });
        } else {
          throw new Error('You are locked out');
        }
      } else {
        throw new Error('Something went wrong');
      }
    }).catch((error) => {
      removeStorageItem(Storages.local, JWTTokenKey);
      const errorMsg = error.response?.data?.message ? error.response.data.message : error.message;
      console.error(`[Get Logged User ERROR]: ${errorMsg}`);
      /* if (error.response?.status === StatusCodes.UNAUTHORIZED || error.response?.status === StatusCodes.NOT_FOUND) {
        removeLocalStorageItem(STORAGE_KEYS.JWTToken);
      }*/
      reject(new Error(errorMsg));
    }); 
  })
};

export const registerUser = async (authRegister: AuthRegister) => {
  return new Promise<true>((resolve, reject) => {
    register(authRegister).then(async (response: AxiosResponse) => {
      if (response.status === StatusCodes.CREATED) {
        resolve(true);
      } else {
        throw new Error('Something went wrong');
      }
    }).catch((error) => {
      let errorMsg = error.message;
      if (error.response?.data?.message) {
        errorMsg = error.response.data.message
      } else {
        const errorValFields = error.response?.data?.fields;
        if (errorValFields?.length > 0 && 
          errorValFields[0]?.error &&
          errorValFields[0]?.name) {
          errorMsg = `${capitalizeFirstLetter(errorValFields[0].error)} with the ${errorValFields[0].name} field`
        }
      }
      console.error(`[Register ERROR]: ${errorMsg}`);
      reject(new Error(errorMsg));
    });
  })
};

export const loginUser = async (authLogin: AuthLogin, token: string) => {
  return new Promise<{token: string, user: User, cart: Cart}>((resolve, reject) => {
    login(authLogin).then(async (response: AxiosResponse) => {
      if (response.status === StatusCodes.CREATED) {
        if (response.data.token){
          if (token !== '') {
            await logoutUser(token);
          }
          await setStorageItem(Storages.local, JWTTokenKey, response.data.token);
          getCredentials().then((response: {token: string, user: User, cart: Cart}) => {
            resolve({
              token: response.token,
              user: response.user,
              cart: response.cart,
            });
          }).catch((error: Error) => {
            reject(error);
          });
          
        } else {
          throw new Error('Error generating login token');
        }
      } else {
        throw new Error('Something went wrong');
      }
    }).catch((error) => {
      const errorMsg = error.response?.data?.message ? error.response.data.message : error.message;
      console.error(`[Login ERROR]: ${errorMsg}`);
      reject(new Error(errorMsg));
    });
  })
};

export const logoutUser = async (token: string) => {
  await logout(token);
  await removeStorageItem(Storages.local, JWTTokenKey);
};

export const updateUser = async (user: User, token: string) => {
  return new Promise<{user: User}>((resolve, reject) => {
    update(token, user).then(async (response: AxiosResponse) => {
      if (response.status === StatusCodes.CREATED) {
        resolve({
          user: response.data.user
        });
      } else {
        throw new Error('Something went wrong');
      }
    }).catch((error) => {
      let errorMsg = error.message;
      if (error.response?.data?.message) {
        errorMsg = error.response.data.message
      } else {
        const errorValFields = error.response?.data?.fields;
        if (errorValFields?.length > 0 && 
          errorValFields[0]?.error &&
          errorValFields[0]?.name) {
          errorMsg = `${capitalizeFirstLetter(errorValFields[0].error)} with the ${errorValFields[0].name} field`
        }
      }
      console.error(`[Update User ERROR]: ${errorMsg}`);
      reject(new Error(errorMsg));
    });
  })
};
