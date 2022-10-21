import { AxiosRequestConfig } from 'axios';

import axios from '@core/config/axios.config';
import envConfig from '@core/config/env.config';
import { pages } from '@core/config/navigation.config';

export const checkoutOrder = (token: string) => {
  const data = {
    currencyCode: 'EUR',
    returnUrl: `${envConfig.NEXT_PUBLIC_APP_URL}${pages.orders.path}`,
    cancelUrl: `${envConfig.NEXT_PUBLIC_APP_URL}${pages.cart.path}`,
  };
  const options: AxiosRequestConfig = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
  };
  return axios.post('/paypal/checkout-order', data, options);
};

export const captureOrder = (token: string, orderToken: string) => {
  const data = {
    orderToken: orderToken,
  };
  const options: AxiosRequestConfig = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
  };
  return axios.post('/paypal/capture-order', data, options);
};
