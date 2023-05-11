import { useRef, useEffect, useCallback } from 'react';

import { useIntl } from 'react-intl';

import { PageTypes } from '@core/constants/navigation';
import type { Landing, ProductCategory } from '@core/types/products';
import type { User } from '@core/types/user';
import type { Cart } from '@core/types/cart';
import type { PaypalCredentials } from '@core/types/paypal';
import { init } from '@core/utils/auth';

import { useAppContext } from '@lib/contexts/AppContext';
import { useSearchContext } from '@lib/contexts/SearchContext';
import { useProductsContext } from '@lib/contexts/ProductsContext';
import { useCartContext } from '@lib/contexts/CartContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import useForms from '@lib/hooks/useForms';

const useApp = (pageType: PageTypes | undefined) => {
  const { setInitialized } = useAppContext();
  const { setProductCategories } = useSearchContext();
  const { initLandings } = useProductsContext();
  const { initCart } = useCartContext();
  const { 
    setToken,
    setUser,
    setPaypal,
  } = useAuthContext();

  const intl = useIntl();

  const { initForms } = useForms();

  const firstRenderRef = useRef(false);

  const initData = useCallback(async () => {
    initForms();
    if (pageType !== PageTypes.link) {
      await init(
        intl.locale,
        [],
        pageType === PageTypes.admin ? [] : undefined,
      ).then(async (
          response: {
            productCategories: ProductCategory[], 
            landings: Landing[],
            cart: Cart,
            token?: string, 
            user?: User,
            paypal?: PaypalCredentials,
          }
        ) => {
          setProductCategories(response.productCategories);
          initLandings(response.landings);
          initCart(response.cart);
          if (response.token && response.user) {
            setToken(response.token);
            setUser(response.user);
          }
          setPaypal(response.paypal);
          setInitialized(true);
        }).catch(async (_error: Error) => {
          //throw error;
        });
    } else {
      setInitialized(true);
    }
  }, [initCart, initForms, initLandings, intl.locale, pageType, setInitialized, setPaypal, setProductCategories, setToken, setUser]);

  useEffect(() => {
    if (!firstRenderRef.current && pageType) {
      firstRenderRef.current = true;
      initData();
    }
  }, [pageType, initData]);

  return {};
};

export default useApp;
