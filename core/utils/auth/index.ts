import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { JWTTokenKey } from '@core/constants/auth';
import { Storages } from '@core/constants/storage';
import type { User } from '@core/types/user';
import type { FormLogin, FormRegister, FormUpdateUserData } from '@core/types/forms';
import type { Cart } from '@core/types/cart';
import { getStorageItem, setStorageItem, removeStorageItem } from '@core/utils/storage';
import { logged, login, register, logout, isAdmin, updateData } from '@core/middlewares/auth';
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

export const isAdminUser = async (token: string) => {
  return new Promise<{isAdmin: boolean}>(async (resolve, reject) => {
    logged(token).then(async (response: AxiosResponse) => {
      if (response.status === StatusCodes.OK && response.data?.isAdmin) {
          resolve({
            isAdmin: response.data.isAdmin,
          });
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

export const updateUserData = async (formUpdateUser: FormUpdateUserData, userId: number, token: string) => {
  return new Promise<{user: User}>((resolve, reject) => {
    updateData(token, userId, formUpdateUser).then(async (response: AxiosResponse) => {
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
