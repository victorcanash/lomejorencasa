import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';

import { useIntl } from 'react-intl';

import { AdminSections } from '@core/constants/admin';
import { allProductsName } from '@core/constants/products';
import type { Product, ProductCategory, ProductPack } from '@core/types/products';
import { getAllProducts, getAllPacks, getProduct } from '@core/utils/products';

import searchConfig from '@lib/config/search.config';
import { useAppContext } from '@core/contexts/AppContext';
import { useAuthContext } from '@core/contexts/AuthContext';
import { CheckProductsSectionProps } from '@core/components/Admin/sections/CheckProductsSection';
import { CheckPacksSectionProps } from '@core/components/Admin/sections/CheckPacksSection';

const useAdmin = (checkedPage: boolean) => {
  const { setLoading } = useAppContext();
  const { token } = useAuthContext();

  const router = useRouter();
  const intl = useIntl();

  const [section, setSection] = useState<AdminSections | undefined>(undefined);
  const [checkProductsProps, setCheckProductsProps] = useState<CheckProductsSectionProps | undefined>(undefined);
  const [checkPacksProps, setCheckPacksProps] = useState<CheckPacksSectionProps | undefined>(undefined);

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

    await getAllProducts(token, intl.locale, pageSearch, searchConfig.limitByPage, sortBySearch, orderSearch, keywordsSearch, categorySearch, searchConfig.orderRemains, true)
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

  const getCheckPacksProps = useCallback(async (sectionSearch: AdminSections) => {
    const { page, sortBy, order } = router.query;
    const pageSearch = typeof page == 'string' && parseInt(page) > 0 ? parseInt(page) : 1;
    const sortBySearch = typeof sortBy == 'string' ? sortBy : 'id';
    const orderSearch = typeof order == 'string' ? order : 'asc';

    await getAllPacks(token, intl.locale, pageSearch, searchConfig.limitByPage, sortBySearch, orderSearch)
      .then((response: { packs: ProductPack[], totalPages: number, currentPage: number }) => {
        setCheckPacksProps({
          packs: response.packs,
          totalPages: response.totalPages,
          currentPage: response.currentPage,
        });
        setSection(sectionSearch);
      }).catch((_error: Error) => {
        setSection(AdminSections.home);
      });
  }, [intl.locale, router.query, token]);
  
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
          case AdminSections.checkProductPacks.toString():
            sectionSearch = AdminSections.checkProductPacks;
            getCheckPacksProps(sectionSearch);
            return;
          case AdminSections.createProductCategory.toString():
            sectionSearch = AdminSections.createProductCategory;
            break;
          case AdminSections.createProduct.toString():
            sectionSearch = AdminSections.createProduct;
            break;
          case AdminSections.createProductPack.toString():
            sectionSearch = AdminSections.createProductPack;
            break;
          case AdminSections.createFailedOrder.toString():
            sectionSearch = AdminSections.createFailedOrder;
            break;
          case AdminSections.sendOrderEmail.toString():
            sectionSearch = AdminSections.sendOrderEmail;
            break;
          case AdminSections.sendFailedOrderEmail.toString():
            sectionSearch = AdminSections.sendFailedOrderEmail;
            break;
        }
      }
      setSection(sectionSearch);
    }
  }, [checkedPage, getCheckPacksProps, getCheckProductsProps, router.query.section]);

  return {
    section,
    checkProductsProps,
    checkPacksProps
  };
};

export default useAdmin;
