import { useState } from 'react';

import type { User } from '@core/types/user';
import type { FormUpdateUser } from '@core/types/forms/user';
import { updateUser } from '@core/utils/user';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';

const useUser = () => {
  const { setLoading } = useAppContext();
  const { token, user, setUser } = useAuthContext();

  const [errorMsg, setErrorMsg] = useState('');

  const [successMsg, setSuccessMsg] = useState('');

  const update = async (formUpdateUser: FormUpdateUser) => {
    setLoading(true);
    setSuccessMsg('');
    updateUser(token, formUpdateUser, user?.id || -1).then((response: {user: User}) => {
      onUpdateSuccess(response.user);
    }).catch((error: Error) => {
      const errorMsg = error.message;
      setErrorMsg(errorMsg);
      setLoading(false);
    });
  };

  const onUpdateSuccess = (user: User) => {
    setUser(user);
    setLoading(false);
    setSuccessMsg('Updated data');
  }

  return {
    update,
    errorMsg,
    successMsg,
  };
};

export default useUser;
