import { AxiosRequestConfig } from 'axios';

import axios from '@core/config/axios.config';

export const getProducts = (page?: number, limit?: number, sortBy?: string, order?: string, keywords?: string, categoryId?: number, ordersRemain: boolean = false) => {
  const options: AxiosRequestConfig = {
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

export const getProductCategories = (page?: number, limit?: number, sortBy?: string, order?: string) => {
  const options: AxiosRequestConfig = {
    params: {
      page,
      limit,
      sortBy,
      order
    }
  }
  return axios.get('/pcategories', options);
}
