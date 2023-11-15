import { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { StatusCodes } from 'http-status-codes'

import axios, { getAuthHeaders, getLanguageHeaders } from '@core/config/axios.config'
import envConfig from '@core/config/env.config'
import { Storages } from '@core/constants/storage'
import { JWTTokenKey } from '@core/constants/auth'
import { GuestCartKey } from '@core/constants/cart'
import type { Page } from '@core/types/navigation'
import type { PaypalCredentials } from '@core/types/payment'
import type { User } from '@core/types/user'
import type {
  AuthLogin,
  AuthRegister,
  AuthUpdateEmail,
  AuthResetPsw
} from '@core/types/auth'
import type { Cart, GuestCartCheck } from '@core/types/cart'
import { getBackendErrorMsg, logBackendError } from '@core/utils/errors'
import { convertCartToGuestCart, convertGuestCartCheckToCart, getGuestCart } from '@core/utils/cart'
import { getStorageItem, setStorageItem, removeStorageItem } from '@core/utils/storage'

export const init = async (currentLocale: string) => {
  const guestCart = getGuestCart()
  return await new Promise<{
    cart: Cart
    token?: string
    user?: User
    paypal?: PaypalCredentials
  }>((resolve, reject) => {
    const token = getStorageItem(Storages.local, JWTTokenKey) ?? undefined
    const options: AxiosRequestConfig = { timeout: 20000 }
    if (token != null) {
      options.headers = {
        ...getAuthHeaders(token),
        ...getLanguageHeaders(currentLocale)
      }
    }
    axios.post('/auth/init', {
      guestCart
    }, options)
      .then(async (response: AxiosResponse) => {
        if (
          response.status === StatusCodes.CREATED &&
          response.data?.paypal?.token != null
        ) {
          if (response.data.user != null) {
            if (response.data.user.lockedOut === true/* || !response.data.user.isActivated */) {
              let errorMsg = ''
              if (response.data.user.lockedOut === true) {
                errorMsg = getBackendErrorMsg('Get Logged User WARNING', new Error('You are locked out'))
              }/* else {
                errorMsg = getBackendErrorMsg('Get Logged User WARNING', new Error('You need to activate your account'));
              } */
              logBackendError(errorMsg)
              removeStorageItem(Storages.local, JWTTokenKey)
            }
          } else {
            removeStorageItem(Storages.local, JWTTokenKey)
          }
          resolve({
            cart: response.data.user?.cart ?? convertGuestCartCheckToCart(response.data.guestCart as GuestCartCheck),
            token,
            user: response.data.user ?? undefined,
            paypal: {
              token: response.data.paypal.token,
              advancedCards: response.data.paypal.advancedCards
            }
          })
        } else {
          throw new Error('Something went wrong')
        }
      }).catch(async (error) => {
        removeStorageItem(Storages.local, JWTTokenKey)
        const errorMsg = getBackendErrorMsg('Init ERROR', error)
        logBackendError(errorMsg)
        reject(new Error(errorMsg))
      })
  })
}

export const registerUser = async (currentLocale: string, authRegister: AuthRegister) => {
  return await new Promise<true>((resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: getLanguageHeaders(currentLocale)
    }
    axios.post('/auth/register', authRegister, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED) {
          resolve(true)
        } else {
          throw new Error('Something went wrong')
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Register ERROR', error)
        logBackendError(errorMsg)
        reject(new Error(errorMsg))
      })
  })
}

export const activateUser = async (activationToken: string) => {
  return await new Promise<true>((resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: getAuthHeaders(activationToken)
    }
    axios.put('/auth/activate', undefined, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED) {
          resolve(true)
        } else {
          throw new Error('Something went wrong')
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Activate ERROR', error)
        logBackendError(errorMsg)
        reject(new Error(errorMsg))
      })
  })
}

export const loginUser = async (authLogin: AuthLogin, cart?: Cart) => {
  return await login('/auth/login', authLogin, authLogin.remember, cart)
}

export const loginUserGoogle = async (accessToken: string, cart?: Cart) => {
  return await login('/auth/login/google', { accessToken }, true, cart)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const login = async (url: string, body: any, remember: boolean, cart?: Cart) => {
  return await new Promise<{ token: string, user: User, cart: Cart }>((resolve, reject) => {
    const guestCart = cart != null && cart.items.length > 0 ? convertCartToGuestCart(cart) : undefined
    axios.post(url, { ...body, guestCart })
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED && response.data?.user != null) {
          if (response.data.token != null) {
            const prevToken = getStorageItem(Storages.local, JWTTokenKey)
            if (prevToken != null) {
              await logoutUser(prevToken)
            }
            if (remember) {
              setStorageItem(Storages.local, JWTTokenKey, response.data.token)
            }
            removeStorageItem(Storages.local, GuestCartKey)
            resolve({
              token: response.data.token,
              user: response.data.user,
              cart: response.data.user.cart
            })
          } else {
            throw new Error('Error generating token')
          }
        } else {
          throw new Error('Something went wrong')
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Login ERROR', error)
        logBackendError(errorMsg)
        reject(new Error(errorMsg))
      })
  })
}

export const logoutUser = async (token: string) => {
  await new Promise<void>((resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: getAuthHeaders(token)
    }
    axios.post('/auth/logout', undefined, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED) {
          removeStorageItem(Storages.local, JWTTokenKey)
          removeStorageItem(Storages.local, GuestCartKey)
          resolve()
        } else {
          throw new Error('Something went wrong')
        }
      }).catch(async (error) => {
        removeStorageItem(Storages.local, JWTTokenKey)
        removeStorageItem(Storages.local, GuestCartKey)
        const errorMsg = getBackendErrorMsg('Logout User ERROR', error)
        logBackendError(errorMsg)
        reject(new Error(errorMsg))
      })
  })
}

export const isAdminUser = async (token: string) => {
  return await new Promise<boolean>((resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: getAuthHeaders(token)
    }
    axios.get('/auth/admin', options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.OK) {
          resolve(response.data?.isAdmin ?? false)
        } else {
          throw new Error('Something went wrong')
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Is Admin User ERROR', error)
        logBackendError(errorMsg)
        reject(new Error(errorMsg))
      })
  })
}

export const updateUserEmail = async (updateToken: string, newEmail = '', userId = -1) => {
  return await new Promise<{ token: string, user: User }>((resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: getAuthHeaders(updateToken)
    }
    axios.put(`/auth/${userId}`, { newEmail }, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED && response.data?.user != null) {
          if (response.data?.token != null) {
            setStorageItem(Storages.local, JWTTokenKey, response.data.token)
            resolve({
              token: response.data.token,
              user: response.data.user
            })
          } else {
            throw new Error('Error generating token')
          }
        } else {
          throw new Error('Something went wrong')
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Update User Email ERROR', error)
        logBackendError(errorMsg)
        reject(new Error(errorMsg))
      })
  })
}

export const resetUserPsw = async (updateToken: string, authResetPassword: AuthResetPsw, userId = -1) => {
  return await new Promise<{ token: string, user: User }>((resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: getAuthHeaders(updateToken)
    }
    axios.put(`/auth/${userId}`, authResetPassword, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED && response.data?.user != null) {
          if (response.data?.token != null) {
            setStorageItem(Storages.local, JWTTokenKey, response.data.token)
            resolve({
              token: response.data.token,
              user: response.data.user
            })
          } else {
            throw new Error('Error generating token')
          }
        } else {
          throw new Error('Something went wrong')
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Reset User Password ERROR', error)
        logBackendError(errorMsg)
        reject(new Error(errorMsg))
      })
  })
}

export const sendUserActivationEmail = async (currentLocale: string, email: string, urlPage: Page) => {
  return await new Promise<true>((resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: getLanguageHeaders(currentLocale),
      params: {
        appName: envConfig.APP_NAME,
        appDomain: envConfig.APP_URL,
        url: `${envConfig.APP_URL}${urlPage.path}`
      }
    }
    axios.post('auth/send-email/activation', { email }, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED) {
          resolve(true)
        } else {
          throw new Error('Something went wrong')
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Send User Activation Email ERROR', error)
        logBackendError(errorMsg)
        reject(new Error(errorMsg))
      })
  })
}

export const sendUserResetPswEmail = async (currentLocale: string, email: string, urlPage: Page) => {
  return await new Promise<true>((resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: getLanguageHeaders(currentLocale),
      params: {
        appName: envConfig.APP_NAME,
        appDomain: envConfig.APP_URL,
        url: `${envConfig.APP_URL}${urlPage.path}`
      }
    }
    axios.post('auth/send-email/reset', { email }, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED) {
          resolve(true)
        } else {
          throw new Error('Something went wrong')
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Send User Reset Email ERROR', error)
        logBackendError(errorMsg)
        reject(new Error(errorMsg))
      })
  })
}

export const sendUserUpdateEmail = async (token: string, currentLocale: string, authUpdateEmail: AuthUpdateEmail, urlPage: Page, revertEmail = false) => {
  return await new Promise<true>((resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: {
        ...getAuthHeaders(token),
        ...getLanguageHeaders(currentLocale)
      },
      params: {
        appName: envConfig.APP_NAME,
        appDomain: envConfig.APP_URL,
        url: `${envConfig.APP_URL}${urlPage.path}`,
        revertEmail
      }
    }
    axios.post('auth/send-email/update', authUpdateEmail, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED) {
          resolve(true)
        } else {
          throw new Error('Something went wrong')
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Send User Update Email ERROR', error)
        logBackendError(errorMsg)
        reject(new Error(errorMsg))
      })
  })
}
