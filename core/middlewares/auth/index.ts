import { AxiosRequestConfig } from 'axios';

import axios from '@core/config/axios.config';
import envConfig from '@core/config/env.config';
import { pages } from '@core/config/navigation.config';
import type { FormLogin, FormRegister, FormUpdateEmail, FormResetPassword } from '@core/types/forms/auth';

export const register = (formRegister: FormRegister) => {
  return axios.post('/register', formRegister);
};

export const activate = (token: string) => {
  const options: AxiosRequestConfig = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
  };
  return axios.put('/activate', undefined, options);
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

export const isAdmin = (token: string) => {
  const options: AxiosRequestConfig = {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  };
  return axios.get('/auth/admin', options);
};

export const updateEmail = (token: string, newEmail = '', userId = -1) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  return axios.put(`/auth/${userId}`, {
    newEmail,
  }, options);
};

export const resetPassword = (token: string, formResetPassword: FormResetPassword, userId = -1) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  return axios.put(`/auth/${userId}`, formResetPassword, options);
};

export const sendActivationEmail = (email: string) => {
  const options: AxiosRequestConfig = {
    params: {
      appName: envConfig.NEXT_PUBLIC_APP_NAME,
      appDomain: envConfig.NEXT_PUBLIC_APP_URL,
      url: `${envConfig.NEXT_PUBLIC_APP_URL}${pages.activation.path}`,
    }
  };
  return axios.post('auth/send-email/activation', { email }, options);
}

export const sendResetEmail = (email: string) => {
  const options: AxiosRequestConfig = {
    params: {
      appName: envConfig.NEXT_PUBLIC_APP_NAME,
      appDomain: envConfig.NEXT_PUBLIC_APP_URL,
      url: `${envConfig.NEXT_PUBLIC_APP_URL}${pages.reset.path}`,
    }
  };
  return axios.post('auth/send-email/reset', { email }, options);
}

export const sendUpdateEmail = (token: string, formUpdateEmail: FormUpdateEmail, revertEmail = false) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    params: {
      appName: envConfig.NEXT_PUBLIC_APP_NAME,
      appDomain: envConfig.NEXT_PUBLIC_APP_URL,
      url: `${envConfig.NEXT_PUBLIC_APP_URL}${pages.newemail.path}`,
      revertEmail,
    }
  };
  return axios.post('auth/send-email/update', formUpdateEmail, options);
}
