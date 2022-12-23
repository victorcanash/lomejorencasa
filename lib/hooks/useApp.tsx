import { useRef, useEffect, useCallback } from 'react';

import { useIntl } from 'react-intl';

import type { ProductCategory } from '@core/types/products';
import { getAllProductCategories } from '@core/utils/products';
import { useAppContext } from '@lib/contexts/AppContext';
import { useSearchContext } from '@lib/contexts/SearchContext';
import useAuth from '@lib/hooks/useAuth';
import useForms from '@lib/hooks/useForms';

const useApp = (fromLinkLayout: boolean) => {
  const { setInitialized } = useAppContext();
  const { setProductCategories } = useSearchContext();

  const intl = useIntl();

  const { getLogged } = useAuth();
  const { initForms } = useForms();

  const firstRenderRef = useRef(false);

  const initData = useCallback(async () => {
    initForms();
    if (!fromLinkLayout) {
      await getLogged();
      await getAllProductCategories(intl.locale).then((response: {productCategories: ProductCategory[]}) => {
        setProductCategories(response.productCategories);
        setInitialized(true);
      }).catch((error: Error) => {
        throw error;
      });
    } else {
      setInitialized(true);
    }
  }, [initForms, fromLinkLayout, getLogged, intl.locale, setProductCategories, setInitialized]);

  useEffect(() => {
    if (!firstRenderRef.current) {
      firstRenderRef.current = true;
      initData();
    }    
  }, [initData]);

  return {};
}

export default useApp;
