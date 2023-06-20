import { useState, useMemo } from 'react';

import Box from '@mui/material/Box';

import type { ProductCategoryGroup, ProductCategory } from '@core/types/products';
import { ManageActions } from '@core/constants/app';
import ManagePCategoryForm from '@core/components/forms/admin/ManagePCategoryForm';
import CheckCategoriesSection from './CheckCategoriesSection';
import CheckLandingsSection from './CheckLandingsSection';

const CheckStoreSection = () => {
  const [selectCategory, setSelectCategory] = useState<ProductCategory | undefined>(undefined);
  const [updateCategory, setUpdateCategory] = useState<ProductCategory | ProductCategoryGroup | undefined>(undefined);
  const [createCategory, setCreateCategory] = useState<{
    enabled: boolean,
    isGroup: boolean,
    groupId?: number,
  }>({
    enabled: false,
    isGroup: false,
    groupId: undefined, 
  });

  const checkCategoriesEnabled = useMemo(() => {
    if (!selectCategory && !updateCategory && !createCategory.enabled) {
      return true;
    }
    return false;
  }, [createCategory.enabled, selectCategory, updateCategory]);

  const checkLandingsEnabled = useMemo(() => {
    if (selectCategory && !updateCategory && !createCategory.enabled) {
      return true;
    }
    return false;
  }, [createCategory.enabled, selectCategory, updateCategory]);

  const updateCategoryEnabled = useMemo(() => {
    if (!selectCategory && updateCategory && !createCategory.enabled) {
      return true;
    }
    return false;
  }, [createCategory.enabled, selectCategory, updateCategory]);

  const createCategoryEnabled = useMemo(() => {
    if (!selectCategory && !updateCategory && createCategory.enabled) {
      return true;
    }
    return false;
  }, [createCategory.enabled, selectCategory, updateCategory]);

  const onClickSelectBtn = (category: ProductCategory) => {
    setSelectCategory(category);
  };

  const onClickCreateBtn = (isGroup: boolean, groupId?: number) => {
    setCreateCategory({ enabled: true, isGroup, groupId });
  };

  const onClickUpdateBtn = (category: ProductCategory | ProductCategoryGroup) => {
    setUpdateCategory(category);
  };

  const onSuccessCreate = () => {
    setCreateCategory({ enabled: false, isGroup: false, groupId: undefined });
  };

  const onSuccessUpdate = () => {
    setUpdateCategory(undefined);
  };

  const onSuccessDelete = () => {
    setUpdateCategory(undefined);
  };

  const onCancel = () => {
    setUpdateCategory(undefined);
    setCreateCategory({ enabled: false, isGroup: false, groupId: undefined });
  };

  return (
    <Box>
      { checkCategoriesEnabled &&
        <CheckCategoriesSection
          onClickSelectBtn={onClickSelectBtn}
          onClickUpdateBtn={onClickUpdateBtn}
          onClickCreateBtn={onClickCreateBtn}
        />
      }
      { checkLandingsEnabled && selectCategory &&
        <CheckLandingsSection
          productCategory={selectCategory}
        />
      }
      { updateCategoryEnabled &&
        <ManagePCategoryForm
          action={ManageActions.update}
          productCategory={updateCategory}
          onSubmitSuccess={onSuccessUpdate}
          onDeleteSuccess={onSuccessDelete}
          onCancel={onCancel}
        />
      }
      { createCategoryEnabled &&
        <ManagePCategoryForm
          action={ManageActions.create}
          initIsCategoryGroup={createCategory.isGroup}
          initCategoryGroupId={createCategory.groupId}
          onSubmitSuccess={onSuccessCreate}
          onCancel={onCancel}
        />
      }
    </Box>
  );
};

export default CheckStoreSection;
