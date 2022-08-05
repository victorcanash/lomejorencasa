import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import { logoutUser } from '@core/utils/auth';
import { useAppContext } from '@lib/contexts/AppContext';

const useLogoutPage = () => {
  const { token, user, setLoading, setToken, setUser } = useAppContext();

  const firstRenderRef = useRef(true);

  const router = useRouter();

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      setLoading(true);
      const signOut = async () => {
        await logoutUser(token);
        setToken('');
        setUser(undefined);
        router.push('/');
      };
      signOut();
    }
  }, [router, setLoading, setToken, setUser, token, user]);

  return {};
};

export default useLogoutPage;
