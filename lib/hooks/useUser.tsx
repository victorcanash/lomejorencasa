import { useState } from 'react';

import { ManageActions } from '@core/constants/auth';
import type { User } from '@core/types/user';
import { manageUser as manageUserMW } from '@core/utils/user';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import useAuth from '@lib/hooks/useAuth';

const useUser = () => {
  const { setLoading } = useAppContext();
  const { token, setUser } = useAuthContext();

  const { logout } = useAuth();

  const [errorMsg, setErrorMsg] = useState('');

  const [successMsg, setSuccessMsg] = useState('');

  const manageUser = async (action: ManageActions.update | ManageActions.delete, user: User) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    manageUserMW(action, token, user)
      .then((response: {user: User}) => {
        onManageUserSuccess(action, response.user);
      }).catch((error: Error) => {
        const errorMsg = error.message;
        setErrorMsg(errorMsg);
        setLoading(false);
      });
  };

  const onManageUserSuccess = (action: ManageActions.update | ManageActions.delete, user: User) => {
    if (action == ManageActions.update) {
      setUser(user);
      setLoading(false);
      setSuccessMsg('Updated data');
    } else if (action == ManageActions.delete) {
      logout();
      setSuccessMsg('Deleted user');
    }
  }

  return {
    manageUser,
    errorMsg,
    successMsg,
  };
};

export default useUser;
