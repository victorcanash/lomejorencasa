import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

import { JWTTokenKey } from '@core/constants/auth';
import type { User, AuthLogin, AuthRegister } from '@core/types/auth';
import { logged, login, register, logout } from '@core/middlewares/auth';
import { capitalizeFirstLetter } from '@core/utils/strings';

export const getCredentials = async (cookieOptions?: { req: any, res: any }) => {
  return new Promise<{token: string, user: User}>(async (resolve, reject) => {
    const token = await getCookie(JWTTokenKey, cookieOptions)?.toString() || '';
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
      deleteCookie(JWTTokenKey, cookieOptions);
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
            await logoutUser(token);
          }
          await setCookie(JWTTokenKey, response.data.token);
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

export const logoutUser = async (token: string) => {
  await logout(token);
  await deleteCookie(JWTTokenKey);
}
