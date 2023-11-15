import { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { StatusCodes } from 'http-status-codes'

import axios, { getAuthHeaders } from '@core/config/axios.config'
import { getBackendErrorMsg, logBackendError } from '@core/utils/errors'

export const addCheckoutSession = async (token: string) => {
  return await new Promise<{ sessionId: string }>((resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: getAuthHeaders(token)
    }
    axios.post('/stripe/checkout-session', undefined, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED && response.data?.sessionId != null) {
          resolve({
            sessionId: response.data.sessionId
          })
        } else {
          throw new Error('Something went wrong')
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Create Checkout Session ERROR', error)
        logBackendError(errorMsg)
        reject(new Error(errorMsg))
      })
  })
}
