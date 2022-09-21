import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { JWTTokenKey } from '@core/constants/auth';
import { Storages } from '@core/constants/storage';
import type { User } from '@core/types/user';
import type { 
  FormLogin, 
  FormRegister, 
  FormUpdateEmail, 
  FormResetPassword 
} from '@core/types/forms/auth';
import type { Cart } from '@core/types/cart';
import { 
  register, 
  activate, 
  login, 
  logout, 
  getLogged, 
  isAdmin, 
  updateEmail, 
  resetPassword, 
  sendActivationEmail,
  sendResetEmail,
  sendUpdateEmail
} from '@core/middlewares/auth';
import { getBackendErrorMsg } from '@core/utils/errors';
import { getStorageItem, setStorageItem, removeStorageItem } from '@core/utils/storage';

export const registerUser = async (formRegister: FormRegister) => {
  return new Promise<true>((resolve, reject) => {
    register(formRegister).then(async (response: AxiosResponse) => {
      if (response.status === StatusCodes.CREATED) {
        resolve(true);
      } else {
        throw new Error('Something went wrong');
      }
    }).catch((error) => {
      const errorMsg = getBackendErrorMsg(error)
      console.error(`[Register ERROR]: ${errorMsg}`);
      reject(new Error(errorMsg));
    });
  })
};

export const activateUser = async (token: string) => {
  return new Promise<true>((resolve, reject) => {
    activate(token).then(async (response: AxiosResponse) => {
      if (response.status === StatusCodes.CREATED) {
        resolve(true);
      } else {
        throw new Error('Something went wrong');
      }
    }).catch((error) => {
      const errorMsg = getBackendErrorMsg(error);
      console.error(`[Activate ERROR]: ${errorMsg}`);
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
      const errorMsg = getBackendErrorMsg(error);
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
      /* if (error.response?.status === StatusCodes.UNAUTHORIZED || error.response?.status === StatusCodes.NOT_FOUND) {
        removeStorageItem(Storages.local, JWTTokenKey);
      }*/
      const errorMsg = getBackendErrorMsg(error);
      console.error(`[Get Logged ERROR]: ${errorMsg}`);
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
      const errorMsg = getBackendErrorMsg(error);
      console.error(`[Is Admin ERROR]: ${errorMsg}`);
      reject(new Error(errorMsg));
    }); 
  })
}

export const updateUserEmail = async (token: string, newEmail = '', userId = -1) => {
  return new Promise<{token: string, user: User}>((resolve, reject) => {
    updateEmail(token, newEmail, userId).then(async (response: AxiosResponse) => {
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
      const errorMsg = getBackendErrorMsg(error);
      console.error(`[Update Email ERROR]: ${errorMsg}`);
      reject(new Error(errorMsg));
    });
  })
};

export const resetUserPassword = async (token: string, formResetPassword: FormResetPassword, userId = -1) => {
  return new Promise<{token: string, user: User}>((resolve, reject) => {
    resetPassword(token, formResetPassword, userId).then(async (response: AxiosResponse) => {
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
      const errorMsg = getBackendErrorMsg(error);
      console.error(`[Reset Password ERROR]: ${errorMsg}`);
      reject(new Error(errorMsg));
    });
  })
};

export const sendUserActivationEmail = async (email: string) => {
  return new Promise<true>((resolve, reject) => {
    sendActivationEmail(email).then(async (response: AxiosResponse) => {
      if (response.status === StatusCodes.CREATED) {
        resolve(true);
      } else {
        throw new Error('Something went wrong');
      }
    }).catch((error) => {
      const errorMsg = getBackendErrorMsg(error);
      console.error(`[Send Activation Email ERROR]: ${errorMsg}`);
      reject(new Error(errorMsg));
    });
  })
};

export const sendUserResetEmail = async (email: string) => {
  return new Promise<true>((resolve, reject) => {
    sendResetEmail(email).then(async (response: AxiosResponse) => {
      if (response.status === StatusCodes.CREATED) {
        resolve(true);
      } else {
        throw new Error('Something went wrong');
      }
    }).catch((error) => {
      const errorMsg = getBackendErrorMsg(error);
      console.error(`[Send Reset Email ERROR]: ${errorMsg}`);
      reject(new Error(errorMsg));
    });
  })
};

export const sendUserUpdateEmail = async (token: string, formUpdateEmail: FormUpdateEmail, revertEmail = false) => {
  return new Promise<true>((resolve, reject) => {
    sendUpdateEmail(token, formUpdateEmail, revertEmail).then(async (response: AxiosResponse) => {
      if (response.status === StatusCodes.CREATED) {
        resolve(true);
      } else {
        throw new Error('Something went wrong');
      }
    }).catch((error) => {
      const errorMsg = getBackendErrorMsg(error);
      console.error(`[Send Update Email ERROR]: ${errorMsg}`);
      reject(new Error(errorMsg));
    });
  })
};
