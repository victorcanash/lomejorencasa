import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { JWTTokenKey } from '@core/constants/auth';
import { Storages } from '@core/constants/storage';
import type { User } from '@core/types/user';
import type { FormLogin, FormRegister, FormUpdateAuth } from '@core/types/forms/auth';
import type { Cart } from '@core/types/cart';
import { getStorageItem, setStorageItem, removeStorageItem } from '@core/utils/storage';
import { register, login, logout, getLogged, update, isAdmin } from '@core/middlewares/auth';
import { capitalizeFirstLetter } from '@core/utils/strings';

export const registerUser = async (formRegister: FormRegister) => {
  return new Promise<true>((resolve, reject) => {
    register(formRegister).then(async (response: AxiosResponse) => {
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

export const loginUser = async (formLogin: FormLogin, token: string) => {
  return new Promise<{token: string, user: User, cart: Cart}>((resolve, reject) => {
    login(formLogin).then(async (response: AxiosResponse) => {
      if (response.status === StatusCodes.CREATED) {
        if (response.data?.token){
          if (token !== '') {
            await logoutUser(token);
          }
          await setStorageItem(Storages.local, JWTTokenKey, response.data.token);
          getLoggedUser().then((response: {token: string, user: User, cart: Cart}) => {
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

export const getLoggedUser = async () => {
  return new Promise<{token: string, user: User, cart: Cart}>(async (resolve, reject) => {
    const token = await getStorageItem(Storages.local, JWTTokenKey) || '';
    getLogged(token).then(async (response: AxiosResponse) => {
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

export const updateAuth = async (formUpdateAuth: FormUpdateAuth, userId: number, token: string) => {
  return new Promise<{token: string, user: User}>((resolve, reject) => {
    update(token, userId, formUpdateAuth).then(async (response: AxiosResponse) => {
      if (response.status === StatusCodes.CREATED && response.data?.user) {
        if (response.data?.token) {
          await setStorageItem(Storages.local, JWTTokenKey, response.data.token);
          resolve({
            token: response.data.token,
            user: response.data.user,
          });
        } else {
          throw new Error('Error generating updated token');
        }
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
      console.error(`[Update Auth ERROR]: ${errorMsg}`);
      reject(new Error(errorMsg));
    });
  })
};

export const isAdminUser = async (token: string) => {
  return new Promise<boolean>(async (resolve, reject) => {
    isAdmin(token).then(async (response: AxiosResponse) => {
      if (response.status === StatusCodes.OK && response.data?.isAdmin) {
          resolve(response.data?.isAdmin ? true : false);
      } else {
        throw new Error('Something went wrong');
      }
    }).catch((error) => {
      const errorMsg = error.response?.data?.message ? error.response.data.message : error.message;
      console.error(`[Check Admin User ERROR]: ${errorMsg}`);
      reject(new Error(errorMsg));
    }); 
  })
}
