import { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { StatusCodes } from 'http-status-codes'

import axios, { getAuthHeaders, getLanguageHeaders } from '@core/config/axios.config'
import { Storages } from '@core/constants/storage'
import { GuestCartKey } from '@core/constants/cart'
import type { CheckoutData } from '@core/types/checkout'
import type { Cart } from '@core/types/cart'
import { getBackendErrorMsg, logBackendError } from '@core/utils/errors'
import { convertCartToGuestCart } from '@core/utils/cart'
import { removeStorageItem } from '@core/utils/storage'

export const getPaypalUserToken = async (token: string, currentLocale: string) => {
  return await new Promise<{ paypalUserToken: string }>((resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: {
        ...getLanguageHeaders(currentLocale),
        ...getAuthHeaders(token)
      }
    }
    axios.post('payments/paypal-user-token', undefined, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED && response.data != null) {
          resolve({
            paypalUserToken: response.data.paypalUserToken
          })
        } else {
          throw new Error('Something went wrong')
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Get Paypal User Token ERROR', error)
        logBackendError(errorMsg)
        reject(new Error(errorMsg))
      })
  })
}

export const createPaypalTransaction = async (token: string, currentLocale: string, currency: string, checkoutData: CheckoutData, unloggedCart?: Cart) => {
  return await new Promise<{ paypalTransactionId: string }>((resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: {
        ...getAuthHeaders(token),
        ...getLanguageHeaders(currentLocale)
      }
    }
    const body = {
      currency,
      checkoutData: {
        email: checkoutData.checkoutEmail,
        shipping: checkoutData.shipping,
        billing: checkoutData.billing,
        remember: checkoutData.remember,
        notes: checkoutData.notes
      },
      guestCart: (unloggedCart != null) ? convertCartToGuestCart(unloggedCart) : undefined
    }
    axios.post('/payments/paypal-transaction', body, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED && response.data != null) {
          resolve({
            paypalTransactionId: response.data.paypalTransactionId
          })
        } else {
          throw new Error('Something went wrong')
        }
      }).catch(async (error) => {
        const errorMsg = getBackendErrorMsg('Create Paypal Transaction ERROR', error)
        logBackendError(errorMsg)
        reject(new Error(errorMsg))
      })
  })
}

export const capturePaypalTransaction = async (token: string, currentLocale: string, currency: string, checkoutData: CheckoutData, unloggedCart?: Cart) => {
  return await new Promise<{ paypalTransactionId: string }>((resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: {
        ...getAuthHeaders(token),
        ...getLanguageHeaders(currentLocale)
      },
      timeout: 20000
    }
    const body = {
      currency,
      checkoutData: {
        email: checkoutData.checkoutEmail,
        shipping: checkoutData.shipping,
        billing: checkoutData.billing,
        remember: checkoutData.remember,
        notes: checkoutData.notes
      },
      guestCart: (unloggedCart != null) ? convertCartToGuestCart(unloggedCart) : undefined
    }
    axios.post(`/payments/paypal-transaction/${checkoutData.orderId}`, body, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED && response.data != null) {
          removeStorageItem(Storages.local, GuestCartKey)
          resolve({
            paypalTransactionId: response.data.paypalTransactionId
          })
        } else {
          throw new Error('Something went wrong')
        }
      }).catch(async (error) => {
        const errorMsg = getBackendErrorMsg('Capture Paypal Transaction ERROR', error)
        logBackendError(errorMsg)
        reject(new Error(errorMsg))
      })
  })
}
