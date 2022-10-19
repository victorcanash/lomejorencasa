import { AxiosRequestConfig } from 'axios'

import axios from '@core/config/axios.config'
import type { CartItem } from '@core/types/cart'

export const createCartItem = (token: string, cartItem: CartItem) => {
  const options: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axios.post('/cart-items', cartItem, options)
}

export const updateCartItem = (token: string, cartItem: CartItem) => {
  const options: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axios.put(`/cart-items/${cartItem.id}`, cartItem, options)
}

export const deleteCartItem = (token: string, cartItem: CartItem) => {
  const options: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axios.delete(`/cart-items/${cartItem.id}`, options)
}
