import { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { StatusCodes } from 'http-status-codes'

import axios, { getAuthHeaders } from '@core/config/axios.config'
import type { Order, OrderContact, OrderFailedCreate, OrderFailedSendEmail, OrderSendEmail } from '@core/types/orders'
import { getBackendErrorMsg, logBackendError } from '@core/utils/errors'
import { OrderEmailTypes } from '@core/constants/admin'

export const getOrders = async (token: string, page: number, sortBy: string, order: string, userId: number) => {
  return await new Promise<{
    orders: Order[]
    totalPages: number
    currentPage: number
  }>((resolve, reject) => {
    const options: AxiosRequestConfig = {
      params: {
        page,
        limit: 10,
        sortBy,
        order,
        userId
      },
      headers: getAuthHeaders(token)
    }
    axios.get('/orders', options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.OK && response.data?.orders != null) {
          resolve({
            orders: response.data.orders,
            totalPages: response.data.totalPages,
            currentPage: response.data.currentPage
          })
        } else {
          throw new Error('Something went wrong')
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Get Orders ERROR', error)
        logBackendError(errorMsg)
        reject(new Error(errorMsg))
      })
  })
}

export const getOrderById = async (token: string, id: number) => {
  return await new Promise<{ order: Order }>((resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: getAuthHeaders(token),
      timeout: 20000
    }
    axios.get(`/orders/${id}`, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.OK && response.data?.order != null) {
          resolve({
            order: response.data.order
          })
        } else {
          throw new Error('Something went wrong')
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Get Order By Id ERROR', error)
        logBackendError(errorMsg)
        reject(new Error(errorMsg))
      })
  })
}

export const getOrderByBigbuyId = async (orderContact: OrderContact) => {
  return await new Promise<{ order: Order }>((resolve, reject) => {
    const options: AxiosRequestConfig = {
      params: {
        bigbuyId: orderContact.orderId,
        guestUserEmail: orderContact.guestUserEmail
      },
      timeout: 20000
    }
    axios.get('/orders/-1', options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.OK && response.data?.order != null) {
          resolve({
            order: response.data.order
          })
        } else {
          throw new Error('Something went wrong')
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Get Order By Bigbuy Id ERROR', error)
        logBackendError(errorMsg)
        reject(new Error(errorMsg))
      })
  })
}

export const createFailedOrder = async (token: string, order: OrderFailedCreate) => {
  return await new Promise<{ order?: Order }>((resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: getAuthHeaders(token),
      timeout: 20000
    }
    axios.post('/orders', {
      locale: order.locale,
      checkoutData: {
        email: order.checkoutEmail,
        shipping: order.shipping,
        billing: order.shipping,
        remember: false,
        notes: order.notes
      },
      cart: {
        items: order.products
      },
      paypalTransactionId: order.paypalTransactionId,
      currency: order.currency
    }, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED) {
          resolve({
            order: response.data.order
          })
        } else {
          throw new Error('Something went wrong')
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Create Failed Order ERROR', error)
        logBackendError(errorMsg)
        if (errorMsg.includes('Get order info error')) {
          resolve({})
        } else {
          reject(new Error(errorMsg))
        }
      })
  })
}

export const sendOrderEmail = async (token: string, order: OrderSendEmail) => {
  return await new Promise<{ order: Order }>((resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: getAuthHeaders(token),
      timeout: 20000
    }
    axios.post(`/orders/send-email/${order.emailType === OrderEmailTypes.issued ? 'issued' : 'review'}`, {
      locale: order.locale,
      bigbuyId: order.bigbuyId
    }, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED) {
          resolve({
            order: response.data.order
          })
        } else {
          throw new Error('Something went wrong')
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Send Order Email ERROR', error)
        logBackendError(errorMsg)
        reject(new Error(errorMsg))
      })
  })
}

export const sendFailedOrderEmail = async (token: string, order: OrderFailedSendEmail) => {
  return await new Promise<{ order: Order }>((resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: getAuthHeaders(token),
      timeout: 20000
    }
    axios.post(`/orders/send-email/breakdown/${order.orderId}`, {
      locale: order.locale,
      currency: order.currency
    }, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED) {
          resolve({
            order: response.data.order
          })
        } else {
          throw new Error('Something went wrong')
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Send Failed Order Email ERROR', error)
        logBackendError(errorMsg)
        reject(new Error(errorMsg))
      })
  })
}
