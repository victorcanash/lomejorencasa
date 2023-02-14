import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';

import { useIntl } from 'react-intl';

import { AdminSections } from '@core/constants/admin';
import { allProductsName } from '@core/constants/products';
import type { Product, ProductCategory } from '@core/types/products';
import { getAllProducts, getProduct } from '@core/utils/products';

import { limitByPageSearch, orderRemainsSearch } from '@lib/constants/search';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { CheckProductsSectionProps } from '@components/admin/sections/CheckProductsSection';

const useAdmin = (checkedPage: boolean) => {
  const { setLoading } = useAppContext();
  const { token } = useAuthContext();

  const router = useRouter();
  const intl = useIntl();

  const [section, setSection] = useState<AdminSections | undefined>(undefined);
  const [checkProductsProps, setCheckProductsProps] = useState<CheckProductsSectionProps | undefined>(undefined);

  const getAdminProduct = useCallback(async (id: number, bigbuyData: boolean, onSuccess: (product: Product) => void) => {
    setLoading(true);
    await getProduct(token, intl.locale, id, true, bigbuyData)
      .then((response: { product: Product }) => {
        onSuccess(response.product);
        setLoading(false);
    }).catch((_error: Error) => {
      setLoading(false);
    })
  }, [intl.locale, setLoading, token]);

  const getCheckProductsProps = useCallback(async (sectionSearch: AdminSections) => {
    const { category, page, sortBy, order, keywords } = router.query;
    const categorySearch = typeof category == 'string' ? category : allProductsName;
    const pageSearch = typeof page == 'string' && parseInt(page) > 0 ? parseInt(page) : 1;
    const sortBySearch = typeof sortBy == 'string' ? sortBy : 'id';
    const orderSearch = typeof order == 'string' ? order : 'asc';
    const keywordsSearch = typeof keywords == 'string' ? keywords : '';

    await getAllProducts(token, intl.locale, pageSearch, limitByPageSearch, sortBySearch, orderSearch, keywordsSearch, categorySearch, orderRemainsSearch, true)
      .then((response: { products: Product[], productCategory: ProductCategory | null, totalPages: number, currentPage: number }) => {
        setCheckProductsProps({
          category: response.productCategory,
          products: response.products,
          totalPages: response.totalPages,
          currentPage: response.currentPage,
          keywords: keywordsSearch,
          getAdminProduct: getAdminProduct,
        });
        setSection(sectionSearch);
      }).catch((_error: Error) => {
        setSection(AdminSections.home);
      });
  }, [getAdminProduct, intl.locale, router.query, token]);
  
  useEffect(() => {
    if (checkedPage) {
      let sectionSearch = AdminSections.home;
      if (typeof router.query.section == 'string') {
        switch (router.query.section) {
          case AdminSections.checkProductCategories.toString():
            sectionSearch = AdminSections.checkProductCategories;
            break;
          case AdminSections.checkProducts.toString():
            sectionSearch = AdminSections.checkProducts;
            getCheckProductsProps(sectionSearch);
            return;
          case AdminSections.createProductCategory.toString():
            sectionSearch = AdminSections.createProductCategory;
            break;
          case AdminSections.createProduct.toString():
            sectionSearch = AdminSections.createProduct;
            break;
          case AdminSections.createFailedOrder.toString():
            sectionSearch = AdminSections.createFailedOrder;
            break;
          case AdminSections.sendFailedOrderEmail.toString():
            sectionSearch = AdminSections.sendFailedOrderEmail;
            break;
        }
      }
      setSection(sectionSearch);
    }
  }, [checkedPage, getCheckProductsProps, router.query.section]);

  return {
    section,
    checkProductsProps,
  };
};

export default useAdmin;
