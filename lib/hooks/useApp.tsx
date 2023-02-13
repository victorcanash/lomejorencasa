import { useRef, useEffect, useCallback, ReactNode } from 'react';

import { useIntl } from 'react-intl';

import { allProductsName } from '@core/constants/products';
import type { Product, ProductCategory } from '@core/types/products';
import { getAllProductCategories, getAllProducts } from '@core/utils/products';

import { productsCount } from '@lib/constants/products';
import { useAppContext } from '@lib/contexts/AppContext';
import { useSearchContext } from '@lib/contexts/SearchContext';
import { useProductsContext } from '@lib/contexts/ProductsContext';
import useForms from '@lib/hooks/useForms';
import useAuth from '@lib/hooks/useAuth';
import WebLayout from '@components/layouts/WebLayout';
import LinkLayout from '@components/layouts/LinkLayout';
import AdminLayout from '@components/layouts/AdminLayout';

const useApp = (layoutComponent: ({ children }: { children: ReactNode }) => JSX.Element) => {
  const { setInitialized } = useAppContext();
  const { setProductCategories } = useSearchContext();
  const { initProducts } = useProductsContext();

  const intl = useIntl();

  const { initForms } = useForms();
  const { getLogged } = useAuth();

  const firstRenderRef = useRef(false);

  const initData = useCallback(async () => {
    initForms();
    if (layoutComponent != LinkLayout) {
      await getLogged();
    }
    if (layoutComponent == AdminLayout) {
      await getAllProductCategories([], intl.locale, true)
        .then((response: {productCategories: ProductCategory[]}) => {
          setProductCategories(response.productCategories);
          setInitialized(true);
        }).catch((error: Error) => {
          throw error;
        });
    } else if (layoutComponent == WebLayout) {
      await getAllProducts('', intl.locale, 1, productsCount, 'id', 'asc', '', allProductsName, false)
        .then((response: { products: Product[], productCategory: ProductCategory | null, totalPages: number, currentPage: number }) => {
          initProducts(response.products);
          setInitialized(true);
      }).catch((error: Error) => {
        throw error;
      })
    } else {
      setInitialized(true);
    }
  }, [getLogged, initForms, initProducts, intl.locale, layoutComponent, setInitialized, setProductCategories]);

  useEffect(() => {
    if (!firstRenderRef.current) {
      firstRenderRef.current = true;
      initData();
    }    
  }, [initData]);

  return {};
}

export default useApp;
