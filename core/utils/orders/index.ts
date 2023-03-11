import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import axios, { getAuthHeaders } from '@core/config/axios.config';
import envConfig from '@core/config/env.config';
import type { Order, OrderContact, OrderFailedCreate, OrderFailedSendEmail } from '@core/types/orders';
import type { GuestCart } from '@core/types/cart';
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

export const getLoggedOrder = (token: string, id: number) => {
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

export const getUnloggedOrder = (orderContact: OrderContact) => {
  return new Promise<{order: Order}>(async (resolve, reject) => {
    const options: AxiosRequestConfig = {
      params: {
        bigbuyId: orderContact.orderId,
        guestUserEmail: orderContact.guestUserEmail,
      }
    };
    axios.get(`/orders/-1`, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.OK && response.data?.order) {
          resolve({
            order: response.data.order,
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Get Order By Bigbuy Id ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      }); 
  })
};

export const createFailedOrder = (token: string, order: OrderFailedCreate) => {
  return new Promise<{order?: Order}>(async (resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: getAuthHeaders(token),
      params: {
        appName: envConfig.NEXT_PUBLIC_APP_NAME,
        appDomain: envConfig.NEXT_PUBLIC_APP_URL,
      },
      timeout: 15000,
    };
    axios.post('/orders/admin', { 
      ...order,
      cart: {
        items: order.products,
      } as GuestCart,
    }, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED) {
          resolve({
            order: response.data.order,
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Create Failed Order ERROR', error);
        logBackendError(errorMsg);
        if (errorMsg.includes('Get order info error')) {
          resolve({});
        } else {
          reject(new Error(errorMsg));
        }
      }); 
  })
};

export const sendFailedOrderEmail = (token: string, order: OrderFailedSendEmail) => {
  return new Promise<{order: Order}>(async (resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: getAuthHeaders(token),
      params: {
        appName: envConfig.NEXT_PUBLIC_APP_NAME,
        appDomain: envConfig.NEXT_PUBLIC_APP_URL,
      },
      timeout: 15000,
    };
    axios.post(`/orders/send-email/check/${order.orderId}`, { locale: order.locale}, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED) {
          resolve({
            order: response.data.order,
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Send Failed Order Email ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      }); 
  })
};
