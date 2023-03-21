import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';

import { isAdminUser } from '@core/utils/auth';

import { pages } from '@lib/constants/navigation';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';

const usePage = (setLoaded = true) => {
  const { initialized, setLoading } = useAppContext();
  const { token, isLogged, isProtectedPath, isAdminPath, getRedirectProtectedPath } = useAuthContext();

  const [checked, setChecked] = useState(false);

  const router = useRouter();

  const onCheckSuccess = useCallback(() => {
    if (setLoaded) {
      setLoading(false); 
    }
    setChecked(true);
  }, [setLoaded, setLoading]);

  const checkPage = useCallback(async () => {
    if (isProtectedPath() && !isLogged()) {
      router.push(getRedirectProtectedPath());

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
    
  }, [getRedirectProtectedPath, isAdminPath, isLogged, isProtectedPath, onCheckSuccess, router, token]);

  useEffect(() => {
    if (initialized) {      
      checkPage();
    }
  }, [router.asPath, initialized, checkPage]);

  useEffect(() => {
    const path = window.location.hash;
    if (path && path.includes('#')) {
      setTimeout(() => {
        const id = path.replace('#', '');
        const element = window.document.getElementById(id);
        if (element) {
          const r = element.getBoundingClientRect();
          window.top?.scroll({
            top: scrollY + r.top,
            behavior: 'smooth',
          });
        }
      }, 600)
    }
  }, []);

  return {
    checked
  };
};

export default usePage;
