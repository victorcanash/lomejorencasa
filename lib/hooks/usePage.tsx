import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { PageProps } from '@lib/server/page';
import { useAppContext } from '@lib/contexts/AppContext';
import { useCartContext } from '@lib/contexts/CartContext';

const usePage = (pageProps?: PageProps) => {
  const { setLoading, setToken, setUser, setCategories } = useAppContext();
  const { setCart } = useCartContext();

  const router = useRouter();

  useEffect(() => {
    if (pageProps && pageProps.categories && pageProps.categories.length > 0) {
      setToken(pageProps.token);
      setUser(pageProps.user || undefined);
      setCart(pageProps.cart || undefined);
      setCategories(pageProps.categories);
    }
    setLoading(false);  
  }, [
      pageProps, 
      pageProps?.categories, 
      pageProps?.token, 
      pageProps?.user, 
      pageProps?.cart, 
      router.asPath, 
      setCategories, 
      setLoading, 
      setToken, 
      setUser,
      setCart,
    ]
  );

  return {};
};

export default usePage;
