import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import axios, { getAuthHeaders, getLanguageHeaders } from '@core/config/axios.config';
import envConfig from '@core/config/env.config';
import { Storages } from '@core/constants/storage';
import { ManageActions, JWTTokenKey } from '@core/constants/auth';
import { GuestCartKey } from '@core/constants/cart';
import type { User, UserAddress, UserContact } from '@core/types/user';
import type { CheckoutAddresses } from '@core/types/checkout';
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

export const updateUserAddresses = (token: string, user: User, checkoutAddresses: CheckoutAddresses) => {
  return new Promise<{shipping: UserAddress, billing: UserAddress}>(async (resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: getAuthHeaders(token),
    };
    axios.put(`/users/${user.id}/addresses`, checkoutAddresses, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED) {
          resolve({
            shipping: response.data.shipping,
            billing: response.data.billing,
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Update User Addresses ERROR', error);
        logBackendError(errorMsg)
        reject(new Error(errorMsg));
      }); 
  });
};

export const sendUserContactEmail = (currentLocale: string, userContact: UserContact, contactImgs: File[]) => {
  return new Promise<true>((resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: {
        ...getLanguageHeaders(currentLocale),
        'Content-Type': 'multipart/form-data',
      },
      params: {
        appName: envConfig.NEXT_PUBLIC_APP_NAME,
        appDomain: envConfig.NEXT_PUBLIC_APP_URL,
      }
    };
    const data = new FormData();
    for (let i = 0; i < contactImgs.length; i++) {
      data.append('images', contactImgs[i]);
    }
    data.append('type', userContact.type);
    data.append('email', userContact.email);
    data.append('firstName', userContact.firstName);
    if (userContact.orderId) {
      data.append('orderBigbuyId', userContact.orderId);
    }
    data.append('comments', userContact.comments);
    axios.post('users/send-email/contact', data, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED) {
          resolve(true);
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
