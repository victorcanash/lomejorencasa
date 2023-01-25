import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import axios, { getAuthHeaders, getLanguageHeaders } from '@core/config/axios.config';
import envConfig from '@core/config/env.config';
import { ManageActions } from '@core/constants/auth';
import type { User, UserAddress, UserContact } from '@core/types/user';
import type { CheckoutAddresses } from '@core/types/checkout';
import { getBackendErrorMsg, logBackendError } from '@core/utils/errors';

export const manageUser = (action: ManageActions.update | ManageActions.delete, token: string, user: User) => {
  return new Promise<{user: User}>(async (resolve, reject) => {
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
        if (response.status === successStatus) {
          resolve({
            user: response.data.user,
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

export const sendUserContactEmail = (currentLocale: string, userContact: UserContact) => {
  return new Promise<true>((resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: getLanguageHeaders(currentLocale),
      params: {
        appName: envConfig.NEXT_PUBLIC_APP_NAME,
        appDomain: envConfig.NEXT_PUBLIC_APP_URL,
      }
    };
    axios.post('users/send-email/contact', userContact, options)
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
