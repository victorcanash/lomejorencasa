import { AxiosRequestConfig } from 'axios';

import axios from '@core/config/axios.config';

export const getProducts = (page: number, limit: number, sortBy: string, order: string, keywords: string, categoryName: string, ordersRemain: boolean) => {
  let addParams: any = {
    page,
    limit,
    sortBy,
    order,
    keywords,
    ordersRemain
  };
  if (categoryName != 'all' ) {
    addParams = {
      page,
      limit,
      sortBy,
      order,
      keywords,
      categoryName,
      ordersRemain
    };
  }
  const options: AxiosRequestConfig = {
    params: addParams
  }
  return axios.get('/products', options);
}

export const getProductById = (id: number) => {
  const options: AxiosRequestConfig = {
    params: {
      id
    }
  }
  return axios.get(`/products/${id}`, options);
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