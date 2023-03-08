import { useRef, useEffect, useCallback } from 'react';

import { useIntl } from 'react-intl';

import { PaymentModes } from '@core/constants/app';
import { PageTypes } from '@core/constants/navigation';
import type { Product, ProductCategory, ProductPack } from '@core/types/products';
import type { User } from '@core/types/user';
import type { Cart } from '@core/types/cart';
import { init } from '@core/utils/auth';

import { allCategoryIds, allProductIds, allPackIds } from '@lib/constants/products';
import { useAppContext } from '@lib/contexts/AppContext';
import { useSearchContext } from '@lib/contexts/SearchContext';
import { useProductsContext } from '@lib/contexts/ProductsContext';
import { useCartContext } from '@lib/contexts/CartContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import useForms from '@lib/hooks/useForms';

const useApp = (pageType: PageTypes | undefined) => {
  const { setInitialized } = useAppContext();
  const { setProductCategories } = useSearchContext();
  const { initProducts } = useProductsContext();
  const { initCart } = useCartContext();
  const { 
    setToken, 
    setUser, 
    setPaymentMode, 
    setCurrency, 
    setBraintreeToken,
    setPaypalMerchantId,
    setPaypalClientId,
    setPaypalToken,
  } = useAuthContext();

  const intl = useIntl();

  const { initForms } = useForms();

  const firstRenderRef = useRef(false);

  const initData = useCallback(async () => {
    initForms();
    if (pageType !== PageTypes.link) {
      await init(
        intl.locale,
        allCategoryIds,
        allProductIds,
        allPackIds
      ).then(async (
          response: {
            productCategories: ProductCategory[], 
            products: Product[],
            packs: ProductPack[], 
            cart: Cart,
            token?: string, 
            user?: User,
            paymentMode: PaymentModes,
            currency: string,
            braintreeToken?: string,
            paypalMerchantId?: string,
            paypalClientId?: string,
            paypalToken?: string,
          }
        ) => {
          setProductCategories(response.productCategories);
          initProducts(response.products, response.packs);
          initCart(response.cart);
          if (response.token && response.user) {
            setToken(response.token);
            setUser(response.user);
          } 
          setPaymentMode(response.paymentMode);
          setCurrency(response.currency);
          setBraintreeToken(response.braintreeToken);
          setPaypalMerchantId(response.paypalMerchantId);
          setPaypalClientId(response.paypalClientId);
          setPaypalToken(response.paypalToken);
          setInitialized(true);
        }).catch(async (error: Error) => {
          throw error;
        });
    } else {
      setInitialized(true);
    }
  }, [initCart, initForms, initProducts, intl.locale, pageType, setBraintreeToken, setCurrency, setInitialized, setPaymentMode, setPaypalClientId, setPaypalMerchantId, setPaypalToken, setProductCategories, setToken, setUser]);

  useEffect(() => {
    if (!firstRenderRef.current && pageType) {
      firstRenderRef.current = true;
      initData();
    }    
  }, [pageType, initData]);

  return {};
};

export default useApp;
