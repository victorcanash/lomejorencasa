import { useRef, useEffect } from 'react';

import type { User } from '@core/types/user';
import type { ProductCategory } from '@core/types/products';
import type { Cart } from '@core/types/cart';
import { getLoggedUser } from '@core/utils/auth';
import { getAllProductCategories } from '@core/utils/products';
import { useAppContext } from '@lib/contexts/AppContext';
import { useSearchContext } from '@lib/contexts/SearchContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { useCartContext } from '@lib/contexts/CartContext';

const useApp = (fromMainLayout = true) => {
  const { setInitialized } = useAppContext();
  const { setProductCategories } = useSearchContext();
  const { setToken, setUser } = useAuthContext();
  const { initCart } = useCartContext();

  const firstRenderRef = useRef(false);

  useEffect(() => {
    if (!firstRenderRef.current) {
      firstRenderRef.current = true;
      
      const initData = async () => {
        await getLoggedUser().then((response: {token: string, user: User, cart: Cart}) => {
          setToken(response.token);
          setUser(response.user);
          initCart(response.cart);
        }).catch((error: Error) => {
        }); 

        await getAllProductCategories().then((response: {productCategories: ProductCategory[]}) => {
          setProductCategories(response.productCategories);
          setInitialized(true);
        }).catch((error: Error) => {
          throw error;
        });
      };  

      if (fromMainLayout) {
        initData();
      } else {
        setInitialized(true);
      }
    }    
  }, [fromMainLayout, initCart, setInitialized, setProductCategories, setToken, setUser]);

  return {};
}

export default useApp;
