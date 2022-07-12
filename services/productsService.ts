import { AxiosRequestConfig } from 'axios';

import axios from 'utils/config/axios.config';

export const getProducts = (token: string, page?: number, limit?: number, sortBy?: string, order?: string, keywords?: string, categoryId?: number, ordersRemain: boolean = false) => {
  const options: AxiosRequestConfig = {
    headers: {
      'x-access-token': token
    },
    params: {
      page,
      limit,
      sortBy,
      order,
      keywords,
      categoryId,
      ordersRemain
    }
  }
  return axios.get('/products', options);
}

export const getProductCategories = (token: string, page?: number, limit?: number, sortBy?: string, order?: string) => {
  const options: AxiosRequestConfig = {
    headers: {
      'x-access-token': token
    },
    params: {
      page,
      limit,
      sortBy,
      order
    }
  }
  return axios.get('/pcategories', options);
}
