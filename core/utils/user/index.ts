import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { ManageActions } from '@core/constants/auth';
import type { User } from '@core/types/user';
import { updateUser, deleteUser } from '@core/middlewares/user';
import { getBackendErrorMsg, logBackendError } from '@core/utils/errors';

export const manageUser = (action: ManageActions, token: string, user: User) => {
  return new Promise<{user: User}>(async (resolve, reject) => {
    let promiseMW;
    let successStatus = StatusCodes.CREATED;
    let errorTitle = '';
    if (action == ManageActions.update) {
      promiseMW = updateUser;
      errorTitle = 'Update User ERROR';
    } else if (action == ManageActions.delete) {
      promiseMW = deleteUser;
      successStatus = StatusCodes.OK;
      errorTitle = 'Delete User ERROR';
    } else {
      reject(new Error('Create user not available in manageUser function'));
      return;
    }

    promiseMW(token, user)
      .then(async (response: AxiosResponse) => {
        if (response.status === successStatus) {
          resolve({
            user: response.data.user,
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg(errorTitle, error);
        logBackendError(errorMsg)
        reject(new Error(errorMsg));
      }); 
  });
};
