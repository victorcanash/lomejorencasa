import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { RouterPaths } from '@core/constants/navigation';
import { useAppContext } from '@lib/contexts/AppContext';
import useAuth from '@lib/hooks/useAuth';

const usePage = () => {
  const { setLoading } = useAppContext();

  const router = useRouter();

  const { isProtectedPath: isProtectedPage } = useAuth();

  useEffect(() => {
    if (isProtectedPage(router.asPath)) {
      router.push(RouterPaths.login);
    }
    setLoading(false);  
  }, [isProtectedPage, router, router.asPath, setLoading]);

  return {};
};

export default usePage;
