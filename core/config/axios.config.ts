import axios, { type AxiosRequestHeaders } from 'axios'

import envConfig from '@core/config/env.config'

export default axios.create({
  baseURL: envConfig.BACKEND_URL,
  responseType: 'json',
  timeout: 7000
})

export const getAuthHeaders = (token: string) => {
  const headers: AxiosRequestHeaders = {
    Authorization: `Bearer ${token}`
  }
  return headers
}

export const getLanguageHeaders = (currentLocale: string) => {
  const headers: AxiosRequestHeaders = {
    'Accept-Language': currentLocale
  }
  return headers
}
