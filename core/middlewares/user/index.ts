import { AxiosRequestConfig } from 'axios';

import axios from '@core/config/axios.config';
import type { FormUpdateUser } from '@core/types/forms/user';

export const update = (token: string, userId: number, formUpdateUser: FormUpdateUser) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  return axios.put(`/users/${userId}`, formUpdateUser, options);
};
