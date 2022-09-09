import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import type { User } from '@core/types/user';
import type { FormUpdateUser } from '@core/types/forms/user';
import { update } from '@core/middlewares/user';
import { capitalizeFirstLetter } from '@core/utils/strings';

export const updateUser = async (formUpdateUser: FormUpdateUser, userId: number, token: string) => {
  return new Promise<{user: User}>((resolve, reject) => {
    update(token, userId, formUpdateUser).then(async (response: AxiosResponse) => {
      if (response.status === StatusCodes.CREATED) {
        resolve({
          user: response.data.user
        });
      } else {
        throw new Error('Something went wrong');
      }
    }).catch((error) => {
      let errorMsg = error.message;
      if (error.response?.data?.message) {
        errorMsg = error.response.data.message
      } else {
        const errorValFields = error.response?.data?.fields;
        if (errorValFields?.length > 0 && 
          errorValFields[0]?.error &&
          errorValFields[0]?.name) {
          errorMsg = `${capitalizeFirstLetter(errorValFields[0].error)} with the ${errorValFields[0].name} field`
        }
      }
      console.error(`[Update User ERROR]: ${errorMsg}`);
      reject(new Error(errorMsg));
    });
  })
};
