import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import axios, { getAuthHeaders } from '@core/config/axios.config';
import { Order } from '@core/types/orders';
import { getBackendErrorMsg, logBackendError } from '@core/utils/errors';

export const getOrders = (token: string, page: number, sortBy: string, order: string, userId: number) => {
  return new Promise<{
    orders: Order[], 
    totalPages: number, 
    currentPage: number,
  }>(async (resolve, reject) => {
    const options: AxiosRequestConfig = {
      params: {
        page,
        limit: 10,
        sortBy,
        order,
        userId,
      },
      headers: getAuthHeaders(token),
    };
    axios.get('/orders', options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.OK && response.data?.orders) {
          resolve({
            orders: response.data.orders,
            totalPages: response.data.totalPages,
            currentPage: response.data.currentPage,
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Get Orders ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      }); 
  })
};

export const getOrder = (token: string, id: number) => {
  return new Promise<{order: Order}>(async (resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: getAuthHeaders(token),
    };
    axios.get(`/orders/${id}`, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.OK && response.data?.order) {
          resolve({
            order: response.data.order,
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Get Order By Id ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      }); 
  })
};
