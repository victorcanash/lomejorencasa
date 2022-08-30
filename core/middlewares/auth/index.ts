import { AxiosRequestConfig } from 'axios';

import axios from '@core/config/axios.config';
import type { User, AuthLogin, AuthRegister } from '@core/types/auth';

export const login = (authLogin: AuthLogin) => {
  return axios.post('/login', authLogin);
};

export const register = (authRegister: AuthRegister) => {
  return axios.post('/register', authRegister);
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

export const update = (token: string, user: User) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  return axios.put(`/users/${user.id}`, user, options);
};
