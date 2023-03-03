import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import axios, { getAuthHeaders, getLanguageHeaders } from '@core/config/axios.config';
import envConfig from '@core/config/env.config';
import { Storages } from '@core/constants/storage';
import { JWTTokenKey } from '@core/constants/auth';
import { GuestCartKey } from '@core/constants/cart';
import type { Page } from '@core/types/navigation';
import type { User } from '@core/types/user';
import type { 
  AuthLogin, 
  AuthRegister, 
  AuthUpdateEmail, 
  AuthResetPsw 
} from '@core/types/auth';
import type { Cart, GuestCartCheck } from '@core/types/cart';
import type { Product, ProductCategory, ProductPack } from '@core/types/products';
import { getBackendErrorMsg, logBackendError } from '@core/utils/errors';
import { convertCartToGuestCart, convertGuestCartCheckToCart, getGuestCart } from '@core/utils/cart';
import { getStorageItem, setStorageItem, removeStorageItem } from '@core/utils/storage';

export const init = async (currentLocale: string, categoryIds: number[], productIds: number[], packIds: number[]) => {
  const guestCart = await getGuestCart();
  return new Promise<{
    productCategories: ProductCategory[],
    products: Product[], 
    packs: ProductPack[],
    cart: Cart,
    token?: string, 
    user?: User, 
    braintreeToken: string, 
  }>(async (resolve, reject) => {
    const token = await getStorageItem(Storages.local, JWTTokenKey) || undefined;
    const options = token ? {
      headers: {
        ...getAuthHeaders(token),
        ...getLanguageHeaders(currentLocale),
      },
    } as AxiosRequestConfig : undefined;
    axios.post('/auth/init', { 
      categoryIds, 
      productIds, 
      packIds, 
      guestCart 
    }, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED && 
            response.data?.braintreeToken && 
            response.data?.categories && 
            response.data?.products &&
            response.data?.packs) {
          if (response.data.user) {
            if (response.data.user.lockedOut || !response.data.user.isActivated) {
              let errorMsg = '';
              if (response.data.user.lockedOut) {
                errorMsg = getBackendErrorMsg('Get Logged User WARNING', new Error('You are locked out'));            
              } else {
                errorMsg = getBackendErrorMsg('Get Logged User WARNING', new Error('You need to activate your account'));
              }
              logBackendError(errorMsg);
              await removeStorageItem(Storages.local, JWTTokenKey);
            }
          } else {
            await removeStorageItem(Storages.local, JWTTokenKey);
          }
          resolve({
            productCategories: response.data.categories,
            products: response.data.products, 
            packs: response.data.packs,
            cart: response.data.user?.cart || convertGuestCartCheckToCart(response.data.guestCart as GuestCartCheck),
            token: token,
            user: response.data.user || undefined,
            braintreeToken: response.data.braintreeToken,
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch(async (error) => {
        await removeStorageItem(Storages.local, JWTTokenKey);
        const errorMsg = getBackendErrorMsg('Init ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      }); 
  });
};

export const registerUser = async (authRegister: AuthRegister) => {
  return new Promise<true>((resolve, reject) => {
    axios.post('/auth/register', authRegister)
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
    axios.put('/auth/activate', undefined, options)
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

export const loginUser = async (authLogin: AuthLogin, cart?: Cart) => {
  const guestCart = cart && cart.items.length > 0 ? convertCartToGuestCart(cart) : undefined;
  return new Promise<{token: string, user: User, braintreeToken: string, cart: Cart}>((resolve, reject) => {
    axios.post('/auth/login', { ...authLogin, guestCart})
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED && response.data?.user && response.data?.braintreeToken) {
          if (response.data.token){
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
  return new Promise<{braintreeToken: string}>(async (resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: getAuthHeaders(token),
    };
    axios.post('/auth/logout', undefined, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED && response.data?.braintreeToken) {
          await removeStorageItem(Storages.local, JWTTokenKey);
          await removeStorageItem(Storages.local, GuestCartKey);
          resolve({
            braintreeToken: response.data.braintreeToken,
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch(async (error) => {
        await removeStorageItem(Storages.local, JWTTokenKey);
        await removeStorageItem(Storages.local, GuestCartKey);
        const errorMsg = getBackendErrorMsg('Logout User ERROR', error);
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
