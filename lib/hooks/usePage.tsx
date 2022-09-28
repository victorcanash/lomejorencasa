import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { pages } from '@core/config/navigation.config';
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
          router.push(pages.login.path);
          return;
        } else if (isAdminPath(router.asPath)) {
          const userAdmin = await isAdminUser(token) 
          if (!userAdmin) {
            router.push(pages.home.path);
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
