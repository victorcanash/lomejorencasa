import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { pages } from '@core/config/navigation.config';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { isAdminUser } from '@core/utils/auth';

const usePage = () => {
  const { initialized, setLoading } = useAppContext();
  const { token, isLogged, isProtectedPath, isAdminPath } = useAuthContext();

  const [checked, setChecked] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (initialized) {
      const checkPage = async () => {
        if (isProtectedPath() && !isLogged()) {
          router.push(pages.login.path);
          return;

        } else if (isAdminPath()) {
          await isAdminUser(token).then((response: boolean) => {
            if (!response) {
              router.push(pages.home.path);
              return;
            }
          }).catch((error: Error) => {
            router.push(pages.home.path);
            return;
          }); 
        }
        
        setLoading(false); 
        setChecked(true);
      }
      
      checkPage();
    }
  }, [isProtectedPath, isAdminPath, token, router, router.asPath, setLoading, isLogged, initialized]);

  return {
    checked
  };
};

export default usePage;
