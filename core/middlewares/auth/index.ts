import { AxiosRequestConfig } from 'axios';

import axios from '@core/config/axios.config';
import envConfig from '@core/config/env.config';
import { pages } from '@core/config/navigation.config';
import type { AuthLogin, AuthRegister, AuthUpdateEmail, AuthResetPassword } from '@core/types/auth';

export const register = (authRegister: AuthRegister) => {
  return axios.post('/register', authRegister);
};

export const activate = (activationToken: string) => {
  const options: AxiosRequestConfig = {
      headers: {
        'Authorization': `Bearer ${activationToken}`
      }
  };
  return axios.put('/activate', undefined, options);
};

export const login = (authLogin: AuthLogin) => {
  return axios.post('/login', authLogin);
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

export const updateEmail = (updateToken: string, newEmail = '', userId = -1) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${updateToken}`
    }
  };
  return axios.put(`/auth/${userId}`, {
    newEmail,
  }, options);
};

export const resetPassword = (updateToken: string, authResetPassword: AuthResetPassword, userId = -1) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${updateToken}`
    }
  };
  return axios.put(`/auth/${userId}`, authResetPassword, options);
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

export const sendUpdateEmail = (token: string, authUpdateEmail: AuthUpdateEmail, revertEmail = false) => {
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
  return axios.post('auth/send-email/update', authUpdateEmail, options);
}
