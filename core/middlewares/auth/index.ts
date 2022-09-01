import { AxiosRequestConfig } from 'axios';

import axios from '@core/config/axios.config';
import type { User } from '@core/types/user';
import type { FormLogin, FormRegister } from '@core/types/forms';

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

export const update = (token: string, user: User) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  return axios.put(`/users/${user.id}`, user, options);
};
