import { AxiosRequestConfig } from 'axios';

import axios from '@core/config/axios.config';
import type { FormLogin, FormRegister, FormUpdateUserData } from '@core/types/forms';

export const login = (formLogin: FormLogin) => {
  return axios.post('/login', formLogin);
};

export const register = (formRegister: FormRegister) => {
  return axios.post('/register', formRegister);
};

export const logout = (token: string) => {
  const options: AxiosRequestConfig = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
  };
  return axios.post('/logout', undefined, options);
};

export const logged = (token: string) => {
  const options: AxiosRequestConfig = {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  };
  return axios.get('/logged', options);
};

export const isAdmin = (token: string) => {
  const options: AxiosRequestConfig = {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  };
  return axios.get('/admin', options);
};

export const updateData = (token: string, userId: number, formUpdateUser: FormUpdateUserData) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  return axios.put(`/users/${userId}`, formUpdateUser, options);
};
