import { AxiosRequestConfig } from 'axios';

import axios from '@core/config/axios.config';

export const createTransaction = (token: string, paymentMethodNonce: string) => {
  const data = {
    paymentMethodNonce,
  };
  const options: AxiosRequestConfig = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
  };
  return axios.post('/payments/transaction', data, options);
};
