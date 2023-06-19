import { useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useSnackbar } from 'notistack';

import { AdminSections } from '@core/constants/admin';
import type { ProductCategoryGroup } from '@core/types/products';
import { getAllProductCategories, getProductCategory } from '@core/utils/products';
import { useAppContext } from '@core/contexts/AppContext';
import { useAdminContext } from '@core/contexts/AdminContext';

const useAdmin = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { setLoading } = useAppContext();
  const {
    section,
    setSection,
    categoryGroups,
    setCategoryGroups,
    categoriesWithoutGroup,
    setCategoriesWithoutGroup,
  } = useAdminContext();

  const firstRenderRef = useRef(false);

  const getCategories = useCallback(async () => {
    setLoading(true);
    await getAllProductCategories(true, true)
      .then((response) => {
        setCategoryGroups(response.productCategories.map((categoryGroupResponse) => {
          const categoryGroup = categoryGroupResponse as ProductCategoryGroup;
          return {
            categoryGroup: categoryGroup,
            checkCategories: categoryGroup.categories ? categoryGroup.categories.map((category) => {
              return {
                category: category,
                landings: [],
              };
            }) : [],
          };
        }));
        setCategoriesWithoutGroup(response.categoriesWithoutGroup ? response.categoriesWithoutGroup.map((categoryWithoutGroup) => {
          return {
            category: categoryWithoutGroup,
            landings: [],
          }
        }) : []);
        setLoading(false);
        console.log('entra2')
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar(
          error.message,
          { variant: 'error' }
        );
      });
  }, [enqueueSnackbar, setCategoriesWithoutGroup, setCategoryGroups, setLoading]);

  const getCategoryDetails = async (slug: string) => {
    setLoading(true);
    await getProductCategory(slug)
      .then((response) => {
        const newCategoryGroups = categoryGroups.map((checkCategoryGroup) => {
          return {
            ...checkCategoryGroup,
            checkCategories: checkCategoryGroup.checkCategories.map((checkCategory) => {
              if (checkCategory.category.slug === slug) {
                return {
                  ...checkCategory,
                  landings: response.landingsResult.landings,
                }
              } else {
                return checkCategory;
              }
            }),
          }
        })
        const newCategoriesWithoutGroup = categoriesWithoutGroup.map((checkCategory) => {
          if (checkCategory.category.slug === slug) {
            return {
              ...checkCategory,
              landings: response.landingsResult.landings,
            }
          } else {
            return checkCategory;
          }
        })
        setCategoryGroups(newCategoryGroups);
        setCategoriesWithoutGroup(newCategoriesWithoutGroup);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar(
          error.message,
          { variant: 'error' }
        );
      });
  };

  useEffect(() => {
    let sectionSearch = AdminSections.home;
    if (typeof router.query.section == 'string') {
      switch (router.query.section) {
        case AdminSections.checkStore.toString():
          sectionSearch = AdminSections.checkStore;
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
  }, [router.query.section, setSection]);

  useEffect(() => {
    if (!firstRenderRef.current && section === AdminSections.checkStore) {
      firstRenderRef.current = true;
      getCategories();
    }
  }, [getCategories, section]);

  return {
    getCategoryDetails,
  };
};

export default useAdmin;
