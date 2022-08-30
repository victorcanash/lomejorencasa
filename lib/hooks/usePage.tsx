import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { RouterPaths } from '@core/constants/navigation';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';

const usePage = () => {
  const { initialized, setLoading } = useAppContext();
  const { isLogged, isProtectedPath } = useAuthContext();

  const router = useRouter();

  useEffect(() => {
    if (initialized && isProtectedPath(router.asPath) && !isLogged()) {
      router.push(RouterPaths.login);
    }
    setLoading(false);  
  }, [isProtectedPath, router, router.asPath, setLoading, isLogged, initialized]);

  return {};
};

export default usePage;
