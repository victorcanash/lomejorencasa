import { AxiosRequestConfig } from 'axios';

import axios from '@core/config/axios.config';
import type { FormLogin, FormRegister, FormUpdateAuth } from '@core/types/forms/auth';

export const register = (formRegister: FormRegister) => {
  return axios.post('/register', formRegister);
};

export const login = (formLogin: FormLogin) => {
  return axios.post('/login', formLogin);
};

export const logout = (token: string) => {
  const options: AxiosRequestConfig = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
  };
  return axios.post('/logout', undefined, options);
};

export const getLogged = (token: string) => {
  const options: AxiosRequestConfig = {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  };
  return axios.get('/auth', options);
};

export const update = (token: string, userId: number, formUpdateAuth: FormUpdateAuth) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  return axios.put(`/auth/${userId}`, formUpdateAuth, options);
};

export const isAdmin = (token: string) => {
  const options: AxiosRequestConfig = {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  };
  return axios.get('/auth/admin', options);
};
