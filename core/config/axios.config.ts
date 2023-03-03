import axios, { AxiosRequestHeaders } from 'axios';

import envConfig from '@core/config/env.config';

export default axios.create({
  baseURL: envConfig.NEXT_PUBLIC_BACKEND_URL,
  responseType: 'json',
  timeout: 7000,
});

export const getAuthHeaders = (token: string) => {
  return {
    'Authorization': `Bearer ${token}`,
  } as AxiosRequestHeaders;
};

export const getLanguageHeaders = (currentLocale: string) => {
  return {
    'Accept-Language': currentLocale,
  } as AxiosRequestHeaders;
};
