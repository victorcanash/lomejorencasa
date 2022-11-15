import { useState } from 'react';

import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';

const useOrders = () => {
  const { setLoading } = useAppContext();
  const { token } = useAuthContext();

  const [errorMsg, setErrorMsg] = useState('');

  const [successMsg, setSuccessMsg] = useState('');

  return {
    errorMsg,
    successMsg,
  };
};

export default useOrders;
