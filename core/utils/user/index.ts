import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import axios, { getAuthHeaders, getLanguageHeaders } from '@core/config/axios.config';
import envConfig from '@core/config/env.config';
import { ManageActions } from '@core/constants/app';
import { Storages } from '@core/constants/storage';
import { JWTTokenKey } from '@core/constants/auth';
import { GuestCartKey } from '@core/constants/cart';
import type { User, UserContact } from '@core/types/user';
import { getBackendErrorMsg, logBackendError } from '@core/utils/errors';
import { removeStorageItem } from '@core/utils/storage';

export const manageUser = (action: ManageActions.update | ManageActions.delete, token: string, user: User) => {
  return new Promise<{user: User, braintreeToken?: string}>(async (resolve, reject) => {
    let promiseMW;
    let successStatus = StatusCodes.CREATED;
    let errorTitle = '';
    if (action == ManageActions.update) {
      promiseMW = updateUser;
      errorTitle = 'Update User ERROR';
    } else if (action == ManageActions.delete) {
      promiseMW = deleteUser;
      successStatus = StatusCodes.OK;
      errorTitle = 'Delete User ERROR';
    } else {
      return;
    }

    promiseMW(token, user)
      .then(async (response: AxiosResponse) => {
        if (response.status === successStatus && response.data) {
          if (action == ManageActions.delete) {
            if (!response.data.braintreeToken) {
              throw new Error('Something went wrong');
            }
            await removeStorageItem(Storages.local, JWTTokenKey);
            await removeStorageItem(Storages.local, GuestCartKey);
          }
          resolve({
            user: response.data.user,
            braintreeToken: action == ManageActions.delete ?
              response.data.braintreeToken : undefined,
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

const updateUser = (token: string, user: User) => {
  const options: AxiosRequestConfig = {
    headers: getAuthHeaders(token),
  };
  return axios.put(`/users/${user.id}`, user, options);
};

const deleteUser = (token: string, user: User) => {
  const options: AxiosRequestConfig = {
    headers: getAuthHeaders(token),
  };
  return axios.delete(`/users/${user.id}`, options)
}

export const sendUserContactEmail = (token: string, currentLocale: string, userContact: UserContact) => {
  return new Promise((resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: {
        ...getAuthHeaders(token),
        ...getLanguageHeaders(currentLocale),
      },
      params: {
        appName: envConfig.APP_NAME,
        appDomain: envConfig.APP_URL,
      },
    };
    axios.post('users/send-email/contact', {
      ...userContact,
      orderBigbuyId: userContact.orderId,
    }, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED) {
          resolve({});
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Send User Contact Email ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      });
  })
};

export const getUserFullName = (user: User) => {
  return `${user.firstName} ${user.lastName}`;
};
