import { useRef, useEffect, useCallback } from 'react';

import type { ProductCategory } from '@core/types/products';
import { getAllProductCategories } from '@core/utils/products';
import { useAppContext } from '@lib/contexts/AppContext';
import { useSearchContext } from '@lib/contexts/SearchContext';
import useAuth from '@lib/hooks/useAuth';

const useApp = (fromLinkLayout: boolean) => {
  const { setInitialized } = useAppContext();
  const { setProductCategories } = useSearchContext();

  const { getLogged } = useAuth()

  const firstRenderRef = useRef(false);

  const initData = useCallback(async () => {
    await getLogged()
    await getAllProductCategories().then((response: {productCategories: ProductCategory[]}) => {
      setProductCategories(response.productCategories);
      setInitialized(true);
    }).catch((error: Error) => {
      throw error;
   });
 }, [getLogged, setProductCategories, setInitialized]);  

  useEffect(() => {
    if (!firstRenderRef.current) {
      firstRenderRef.current = true;
      if (!fromLinkLayout) {
        initData();
      } else {
        setInitialized(true);
      }
    }    
  }, [fromLinkLayout, initData, setInitialized]);

  return {};
}

export default useApp;
