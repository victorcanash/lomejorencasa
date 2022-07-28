import { AxiosRequestConfig } from 'axios';

import axios from '@core/config/axios.config';

export const getProducts = (page: number, limit: number, sortBy: string, order: string, keywords: string, categoryId: number, ordersRemain: boolean = false) => {
  let addParams: any = {
    page,
    limit,
    sort_by: sortBy,
    order,
    keywords,
    orders_remain: ordersRemain
  };
  if (categoryId > -1 ) {
    addParams = {
      page,
      limit,
      sort_by: sortBy,
      order,
      keywords,
      category_id: categoryId,
      orders_remain: ordersRemain
    };
  }
  const options: AxiosRequestConfig = {
    params: addParams
  }
  return axios.get('/products', options);
}

export const getProductCategories = (page?: number, limit?: number, sortBy?: string, order?: string) => {
  const options: AxiosRequestConfig = {
    params: {
      page,
      limit,
      sort_by: sortBy,
      order
    }
  }
  return axios.get('/pcategories', options);
}
