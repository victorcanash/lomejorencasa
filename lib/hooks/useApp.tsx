import { useRef, useEffect, useCallback, ReactNode } from 'react';

import { useIntl } from 'react-intl';

import type { ProductCategory } from '@core/types/products';
import { getAllProductCategories } from '@core/utils/products';
import { useAppContext } from '@lib/contexts/AppContext';
import { useSearchContext } from '@lib/contexts/SearchContext';
import useAuth from '@lib/hooks/useAuth';
import useForms from '@lib/hooks/useForms';
import LinkLayout from '@components/layouts/LinkLayout';
import AdminLayout from '@components/layouts/AdminLayout';

const useApp = (layoutComponent: ({ children }: { children: ReactNode }) => JSX.Element) => {
  const { setInitialized } = useAppContext();
  const { setProductCategories } = useSearchContext();

  const intl = useIntl();

  const { getLogged } = useAuth();
  const { initForms } = useForms();

  const firstRenderRef = useRef(false);

  const initData = useCallback(async () => {
    initForms();
    if (layoutComponent != LinkLayout) {
      await getLogged();
    }
    if (layoutComponent == AdminLayout) {
      await getAllProductCategories(intl.locale, true)
        .then((response: {productCategories: ProductCategory[]}) => {
          setProductCategories(response.productCategories);
          setInitialized(true);
        }).catch((error: Error) => {
          throw error;
        });
    } else {
      setInitialized(true);
    }
  }, [initForms, layoutComponent, getLogged, intl.locale, setProductCategories, setInitialized]);

  useEffect(() => {
    if (!firstRenderRef.current) {
      firstRenderRef.current = true;
      initData();
    }    
  }, [initData]);

  return {};
}

export default useApp;
