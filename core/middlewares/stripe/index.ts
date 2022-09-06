import { AxiosRequestConfig } from 'axios';

import axios from '@core/config/axios.config';

export const createCheckoutSession = (token: string) => {
  const options: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post('/stripe/checkout-session', undefined, options);
};
