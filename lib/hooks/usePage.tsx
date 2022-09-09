import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { RouterPaths } from '@core/constants/navigation';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { isAdminUser } from '@core/utils/auth';

const usePage = () => {
  const { initialized, setLoading } = useAppContext();
  const { token, isLogged, isProtectedPath, isAdminPath } = useAuthContext();

  const router = useRouter();

  useEffect(() => {
    if (initialized) {
      const checkPage = async () => {
        if (isProtectedPath(router.asPath) && !isLogged()) {
          router.push(RouterPaths.login);
          return;
        } else if (isAdminPath(router.asPath)) {
          const userAdmin = await isAdminUser(token) 
          if (!userAdmin) {
            router.push(RouterPaths.home);
            return;
          }
        }
        setLoading(false); 
      }
      
      checkPage();
    }
  }, [isProtectedPath, isAdminPath, token, router, router.asPath, setLoading, isLogged, initialized]);

  return {};
};

export default usePage;
