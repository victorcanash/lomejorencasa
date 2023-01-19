import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';

import { pages } from '@lib/constants/navigation';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { isAdminUser } from '@core/utils/auth';

const usePage = () => {
  const { initialized, setLoading } = useAppContext();
  const { token, isLogged, isProtectedPath, isAdminPath } = useAuthContext();

  const [checked, setChecked] = useState(false);

  const router = useRouter();

  const onCheckSuccess = useCallback(() => {
    setLoading(false); 
    setChecked(true);
  }, [setLoading]);

  const checkPage = useCallback(async () => {
    if (isProtectedPath() && !isLogged()) {
      router.push(pages.login.path);

    } else if (isAdminPath()) {
      await isAdminUser(token).then((response: boolean) => {
        if (!response) {
          router.push(pages.home.path);
        } else {
          onCheckSuccess();
        }
      }).catch((_error: Error) => {
        router.push(pages.home.path);
        return;
      }); 

    } else {
      onCheckSuccess();
    }
    
  }, [isAdminPath, isLogged, isProtectedPath, onCheckSuccess, router, token]);

  useEffect(() => {
    if (initialized) {      
      checkPage();
    }
  }, [router.asPath, initialized, checkPage]);

  return {
    checked
  };
};

export default usePage;
