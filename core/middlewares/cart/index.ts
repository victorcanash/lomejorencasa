import { AxiosRequestConfig } from 'axios'

import axios from '@core/config/axios.config'
import type { CartItem } from '@core/types/cart'

/*export const createCart = (token: string) => {
  const options: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axios.post('/carts', undefined, options)
}*/

export const createCartItem = (token: string, cartItem: CartItem) => {
  const options: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axios.post('/citems', cartItem, options)
}

export const updateCartItem = (token: string, cartItem: CartItem) => {
  const options: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axios.put(`/citems/${cartItem.id}`, cartItem, options)
}

export const deleteCartItem = (token: string, id: number) => {
  const options: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axios.delete(`/citems/${id}`, options)
}
