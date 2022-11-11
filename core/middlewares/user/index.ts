import { AxiosRequestConfig } from 'axios';

import axios from '@core/config/axios.config';
import type { User } from '@core/types/user';
import { CheckoutAddresses } from '@core/types/checkout';

export const updateUser = (token: string, user: User) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  return axios.put(`/users/${user.id}`, user, options);
};

export const deleteUser = (token: string, user: User) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return axios.delete(`/users/${user.id}`, options)
}

export const updateAddresses = (token: string, user: User, checkoutAddresses: CheckoutAddresses) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  return axios.put(`/users/${user.id}/addresses`, checkoutAddresses, options);
};
