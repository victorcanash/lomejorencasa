import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import type { User } from '@core/types/user';
import type { FormUpdateUser } from '@core/types/forms/user';
import { update } from '@core/middlewares/user';
import { getBackendErrorMsg } from '@core/utils/errors';

export const updateUser = async (token: string, formUpdateUser: FormUpdateUser, userId: number) => {
  return new Promise<{user: User}>((resolve, reject) => {
    update(token, formUpdateUser, userId).then(async (response: AxiosResponse) => {
      if (response.status === StatusCodes.CREATED) {
        resolve({
          user: response.data.user
        });
      } else {
        throw new Error('Something went wrong');
      }
    }).catch((error) => {
      const errorMsg = getBackendErrorMsg(error);
      console.error(`[Update User ERROR]: ${errorMsg}`);
      reject(new Error(errorMsg));
    });
  })
};
