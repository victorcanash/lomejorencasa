import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';

import { useIntl } from 'react-intl';

import { init, isAdminUser } from '@core/utils/auth';

import { pages } from '@lib/config/navigation.config';
import { useAppContext } from '@core/contexts/AppContext';
import { useCartContext } from '@core/contexts/CartContext';
import { useAuthContext } from '@core/contexts/AuthContext';

const usePage = (setLoaded = true) => {
  const { initialized, setInitialized, setLoading } = useAppContext();
  const { initCart } = useCartContext();
  const {
    token,
    setToken,
    setUser,
    setPaypal,
    isLogged,
    isProtectedPath,
    isAdminPath,
    getRedirectProtectedPath,
  } = useAuthContext();

  const router = useRouter();
  const intl = useIntl();

  const firstRenderRef = useRef(false);
  const [checked, setChecked] = useState(false);

  const initData = useCallback(async () => {
    await init(
      intl.locale,
    ).then(async (response) => {
      initCart(response.cart);
      if (response.token && response.user) {
        setToken(response.token);
        setUser(response.user);
      }
      setPaypal(response.paypal);
      setInitialized(true);
    }).catch(async (_error: Error) => { 
      // throw error;
    });
  }, [initCart, intl.locale, setInitialized, setPaypal, setToken, setUser]);

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
    if (!firstRenderRef.current && !initialized) {
      firstRenderRef.current = true;
      initData();
    }
  }, [initData, initialized]);

  useEffect(() => {
    if (initialized) {
      checkPage();
    }
  }, [initialized, checkPage]);

  return {
    checked,
  };
};

export default usePage;
