import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { User, AuthLogin, AuthRegister } from 'core/types';
import { JWTTokenKey } from 'core/constants';
import { logged, login, register, logout } from 'core/services/authService';
import { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem } from 'core/utils/storage';
import { capitalizeFirstLetter } from 'core/utils/objects';

export const getCredentials = async () => {
  return new Promise<{token: string, user: User}>(async (resolve, reject) => {
    const token = await getLocalStorageItem(JWTTokenKey);
    logged(token).then(async (response: AxiosResponse) => {
      if (response.status === StatusCodes.OK && response.data?.user) {
        if (!response.data?.user.lockedOut) {
          resolve({
            token: token,
            user: response.data.user
          });
        } else {
          throw new Error('You are locked out');
        }
      } else {
        throw new Error('Something went wrong');
      }
    }).catch((error) => {
      removeLocalStorageItem(JWTTokenKey);
      let errorMsg = error.response?.data?.message ? error.response.data.message : error.message;
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
}

export const loginUser = async (authLogin: AuthLogin, token: string) => {
  return new Promise<{token: string, user: User}>((resolve, reject) => {
    login(authLogin).then(async (response: AxiosResponse) => {
      if (response.status === StatusCodes.CREATED) {
        if (response.data.token){
          if (token !== '') {
            await logout(token);
          }
          await setLocalStorageItem(JWTTokenKey, response.data.token);
          getCredentials().then((response: {token: string, user: User}) => {
            resolve({
              token: response.token,
              user: response.user
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
      let errorMsg = error.response?.data?.message ? error.response.data.message : error.message;
      console.error(`[Login ERROR]: ${errorMsg}`);
      reject(new Error(errorMsg));
    });
  })
}
