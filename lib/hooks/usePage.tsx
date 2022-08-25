import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { RouterPaths } from '@core/constants/navigation';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';

const usePage = () => {
  const { setLoading } = useAppContext();
  const { isLogged, isProtectedPath } = useAuthContext();

  const router = useRouter();

  useEffect(() => {
    if (isProtectedPath(router.asPath)) {
      router.push(RouterPaths.login);
    }
    setLoading(false);  
  }, [isProtectedPath, router, router.asPath, setLoading]);

  return {};
};

export default usePage;
