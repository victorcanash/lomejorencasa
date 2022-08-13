import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { PageProps } from '@lib/server/page';
import { useAppContext } from '@lib/contexts/AppContext';

const usePage = (pageProps?: PageProps) => {
  const { setLoading, setToken, setUser, setCategories } = useAppContext();

  const router = useRouter();

  useEffect(() => {
    if (pageProps && pageProps.categories && pageProps.categories.length > 0) {
      setToken(pageProps.token);
      setUser(pageProps.user || undefined);
      setCategories(pageProps.categories);
    }
    setLoading(false);  
  }, [pageProps, pageProps?.categories, pageProps?.token, pageProps?.user, router.asPath, setCategories, setLoading, setToken, setUser]);

  return {};
};

export default usePage;
