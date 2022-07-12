import { AxiosRequestConfig } from 'axios';

import axios from 'utils/config/axios.config';
import { Cart, CartItem } from 'lib/types';

export const createCart = (token: string, cart: Cart) => {
  const options: AxiosRequestConfig = {
    headers: {
      'x-access-token': token
    }
  }
  return axios.post('/carts', cart, options);
}

export const createCartItem = (token: string, cartItem: CartItem) => {
  const options: AxiosRequestConfig = {
    headers: {
      'x-access-token': token
    }
  }
  return axios.post('/citems', cartItem, options);
}

export const updateCartItem = (token: string, cartItem: CartItem) => {
  const options: AxiosRequestConfig = {
    headers: {
      'x-access-token': token
    }
  }
  return axios.put(`/citems/${cartItem.id}`, cartItem, options);
}

export const deleteCartItem = (token: string, id: number) => {
  const options: AxiosRequestConfig = {
    headers: {
      'x-access-token': token
    }
  }
  return axios.delete(`/citems/${id}`, options);
}
