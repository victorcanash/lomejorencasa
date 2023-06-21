import {
  useState,
  useRef,
  useCallback,
  useEffect,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { useRouter } from 'next/router';

import { useSnackbar } from 'notistack';

import { AdminSections } from '@core/constants/admin';
import type { CheckCategory, CheckCategoryGroup } from '@core/types/admin';
import type { ProductCategoryGroup } from '@core/types/products';
import { getAllProductCategories } from '@core/utils/products';

type ContextType = {
  section: AdminSections | undefined,
  setSection: Dispatch<SetStateAction<AdminSections | undefined>>,
  checkCategoryGroups: CheckCategoryGroup[],
  setCheckCategoryGroups: Dispatch<SetStateAction<CheckCategoryGroup[]>>,
  checkCategoriesWithoutGroup: CheckCategory[],
  setCheckCategoriesWithoutGroup: Dispatch<SetStateAction<CheckCategory[]>>,
};

export const AdminContext = createContext<ContextType>({
  section: undefined,
  setSection: () => {},
  checkCategoryGroups: [],
  setCheckCategoryGroups: () => {},
  checkCategoriesWithoutGroup: [],
  setCheckCategoriesWithoutGroup: () => {},
});

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('Error while reading AdminContext');
  }
  return context;
};

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [section, setSection] = useState<AdminSections | undefined>(undefined);
  const [checkCategoryGroups, setCheckCategoryGroups] = useState<CheckCategoryGroup[]>([]);
  const [checkCategoriesWithoutGroup, setCheckCategoriesWithoutGroup] = useState<CheckCategory[]>([]);

  const firstRenderRef = useRef(false);

  const getCategories = useCallback(async () => {
    await getAllProductCategories(true, true)
      .then((response) => {
        setCheckCategoryGroups(response.productCategories.map((categoryGroupResponse) => {
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
        setCheckCategoriesWithoutGroup(response.categoriesWithoutGroup ? response.categoriesWithoutGroup.map((categoryWithoutGroup) => {
          return {
            category: categoryWithoutGroup,
            landings: [],
          }
        }) : []);
      })
      .catch((error) => {
        enqueueSnackbar(
          error.message,
          { variant: 'error' }
        );
      });
  }, [enqueueSnackbar, setCheckCategoriesWithoutGroup, setCheckCategoryGroups]);

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

  return (
    <AdminContext.Provider
      value={{
        section: section,
        setSection: setSection,
        checkCategoryGroups,
        setCheckCategoryGroups,
        checkCategoriesWithoutGroup,
        setCheckCategoriesWithoutGroup,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
