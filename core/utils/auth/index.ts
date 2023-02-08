import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import axios, { getAuthHeaders, getLanguageHeaders } from '@core/config/axios.config';
import envConfig from '@core/config/env.config';
import { Storages } from '@core/constants/storage';
import { JWTTokenKey } from '@core/constants/auth';
import { GuestCartKey } from '@core/constants/cart';
import type { User } from '@core/types/user';
import type { 
  AuthLogin, 
  AuthRegister, 
  AuthUpdateEmail, 
  AuthResetPsw 
} from '@core/types/auth';
import type { Cart, GuestCart } from '@core/types/cart';
import type { Page } from '@core/types/navigation';
import { getBackendErrorMsg, logBackendError } from '@core/utils/errors';
import { getStorageItem, setStorageItem, removeStorageItem } from '@core/utils/storage';

export const registerUser = async (authRegister: AuthRegister) => {
  return new Promise<true>((resolve, reject) => {
    axios.post('/register', authRegister)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED) {
          resolve(true);
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Register ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      });
  });
};

export const activateUser = async (activationToken: string) => {
  return new Promise<true>((resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: getAuthHeaders(activationToken),
    };
    axios.put('/activate', undefined, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED) {
          resolve(true);
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Activate ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      });
  })
};

export const loginUser = async (authLogin: AuthLogin, cart: Cart | undefined) => {
  const guestCart = cart && cart.items.length > 0 ? {
    items: cart.items.map((item) => {
      return {
        inventoryId: item.inventoryId,
        quantity: item.quantity,
      }
    })
  } as GuestCart : undefined;
  return new Promise<{token: string, user: User, braintreeToken: string, cart: Cart}>((resolve, reject) => {
    axios.post('/login', { ...authLogin, guestCart})
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED && response.data?.user && response.data?.braintreeToken) {
          if (response.data?.token){
            const prevToken = await getStorageItem(Storages.local, JWTTokenKey) || '';
            if (prevToken !== '') {
              await logoutUser(prevToken);
            }
            if (authLogin.remember) {
              await setStorageItem(Storages.local, JWTTokenKey, response.data.token);
            }
            await removeStorageItem(Storages.local, GuestCartKey);
            resolve({
              token: response.data.token,
              user: response.data.user,
              braintreeToken: response.data.braintreeToken,
              cart: response.data.user.cart,
            });         
          } else {
            throw new Error('Error generating token');
          }
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Login ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      });
  });
};

export const logoutUser = async (token: string) => {
  const options: AxiosRequestConfig = {
    headers: getAuthHeaders(token),
  };
  await axios.post('/logout', undefined, options);
  await removeStorageItem(Storages.local, JWTTokenKey);
  await removeStorageItem(Storages.local, GuestCartKey);
};

export const getLoggedUser = async () => {
  return new Promise<{token: string, user: User, braintreeToken: string, cart: Cart}>(async (resolve, reject) => {
    const token = await getStorageItem(Storages.local, JWTTokenKey);
    if (!token) {
      reject(new Error('Empty token'));
      return;
    }
    const options: AxiosRequestConfig = {
      headers: getAuthHeaders(token),
    };
    axios.get('/auth', options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.OK && response.data?.user && response.data?.braintreeToken) {
          if (response.data?.user.lockedOut) {
            throw new Error('You are locked out');
          } else if (!response.data?.user.isActivated) {
            throw new Error('You need to activate your account');
          }
          resolve({
            token: token,
            user: response.data.user,
            braintreeToken: response.data.braintreeToken,
            cart: response.data.user.cart,
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch(async (error) => {
        if (error.response?.status === StatusCodes.UNAUTHORIZED || 
            error.response?.status === StatusCodes.NOT_FOUND ||
            error.message.includes('You are locked out') ||
            error.message.includes('You need to activate your account')) {
          await removeStorageItem(Storages.local, JWTTokenKey);
        }
        const errorMsg = getBackendErrorMsg('Get Logged User ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      }); 
  });
};

export const isAdminUser = async (token: string) => {
  return new Promise<boolean>(async (resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: getAuthHeaders(token),
    };
    axios.get('/auth/admin', options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.OK) {
          resolve(response.data?.isAdmin ? true : false);
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Is Admin User ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      }); 
  })
}

export const updateUserEmail = async (updateToken: string, newEmail = '', userId = -1) => {
  return new Promise<{token: string, user: User}>((resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: getAuthHeaders(updateToken),
    };
    return axios.put(`/auth/${userId}`, { newEmail }, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED && response.data?.user) {
          if (response.data?.token) {
            const prevToken = await getStorageItem(Storages.local, JWTTokenKey) || '';
            if (prevToken !== '') {
              await logoutUser(prevToken);
            }
            await setStorageItem(Storages.local, JWTTokenKey, response.data.token);
            resolve({
              token: response.data.token,
              user: response.data.user,
            });
          } else {
            throw new Error('Error generating token');
          }
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Update User Email ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      });
  })
};

export const resetUserPsw = async (updateToken: string, authResetPassword: AuthResetPsw, userId = -1) => {
  return new Promise<{token: string, user: User}>((resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: getAuthHeaders(updateToken),
    };
    axios.put(`/auth/${userId}`, authResetPassword, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED && response.data?.user) {
          if (response.data?.token) {
            const prevToken = await getStorageItem(Storages.local, JWTTokenKey) || '';
            if (prevToken !== '') {
              await logoutUser(prevToken);
            }
            await setStorageItem(Storages.local, JWTTokenKey, response.data.token);
            resolve({
              token: response.data.token,
              user: response.data.user,
            });
          } else {
            throw new Error('Error generating token');
          }
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Reset User Password ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      });
  })
};

export const sendUserActivationEmail = async (currentLocale: string, email: string, urlPage: Page) => {
  return new Promise<true>((resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: getLanguageHeaders(currentLocale),
      params: {
        appName: envConfig.NEXT_PUBLIC_APP_NAME,
        appDomain: envConfig.NEXT_PUBLIC_APP_URL,
        url: `${envConfig.NEXT_PUBLIC_APP_URL}${urlPage.path}`,
      }
    };
    axios.post('auth/send-email/activation', { email }, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED) {
          resolve(true);
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Send User Activation Email ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      });
  })
};

export const sendUserResetPswEmail = async (currentLocale: string, email: string, urlPage: Page) => {
  return new Promise<true>((resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: getLanguageHeaders(currentLocale),
      params: {
        appName: envConfig.NEXT_PUBLIC_APP_NAME,
        appDomain: envConfig.NEXT_PUBLIC_APP_URL,
        url: `${envConfig.NEXT_PUBLIC_APP_URL}${urlPage.path}`,
      }
    };
    axios.post('auth/send-email/reset', { email }, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED) {
          resolve(true);
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Send User Reset Email ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      });
  })
};

export const sendUserUpdateEmail = async (token: string, currentLocale: string, authUpdateEmail: AuthUpdateEmail, urlPage: Page, revertEmail = false) => {
  return new Promise<true>((resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: {
        ...getAuthHeaders(token),
        ...getLanguageHeaders(currentLocale),
      },
      params: {
        appName: envConfig.NEXT_PUBLIC_APP_NAME,
        appDomain: envConfig.NEXT_PUBLIC_APP_URL,
        url: `${envConfig.NEXT_PUBLIC_APP_URL}${urlPage.path}`,
        revertEmail,
      }
    };
    axios.post('auth/send-email/update', authUpdateEmail, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED) {
          resolve(true);
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Send User Update Email ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      });
  })
};
