import {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';

import { AdminSections } from '@core/constants/admin';
import type { CheckCategory, CheckCategoryGroup } from '@core/types/admin';

type ContextType = {
  section: AdminSections | undefined,
  setSection: Dispatch<SetStateAction<AdminSections | undefined>>,
  categoryGroups: CheckCategoryGroup[],
  setCategoryGroups: Dispatch<SetStateAction<CheckCategoryGroup[]>>,
  categoriesWithoutGroup: CheckCategory[],
  setCategoriesWithoutGroup: Dispatch<SetStateAction<CheckCategory[]>>,
};

export const AdminContext = createContext<ContextType>({
  section: undefined,
  setSection: () => {},
  categoryGroups: [],
  setCategoryGroups: () => {},
  categoriesWithoutGroup: [],
  setCategoriesWithoutGroup: () => {},
});

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('Error while reading AdminContext');
  }
  return context;
};

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [section, setSection] = useState<AdminSections | undefined>(undefined);
  const [categoryGroups, setCategoryGroups] = useState<CheckCategoryGroup[]>([]);
  const [categoriesWithoutGroup, setCategoriesWithoutGroup] = useState<CheckCategory[]>([]);

  return (
    <AdminContext.Provider
      value={{
        section: section,
        setSection: setSection,
        categoryGroups: categoryGroups,
        setCategoryGroups: setCategoryGroups,
        categoriesWithoutGroup: categoriesWithoutGroup,
        setCategoriesWithoutGroup: setCategoriesWithoutGroup,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
