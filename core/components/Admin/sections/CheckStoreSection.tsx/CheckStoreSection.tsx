import { useState } from 'react';

import Box from '@mui/material/Box';

import type { ProductCategoryGroup, ProductCategory } from '@core/types/products';
import { ManageActions } from '@core/constants/app';
import ManagePCategoryForm from '@core/components/forms/admin/ManagePCategoryForm';
import CheckCategoriesSection from './CheckCategoriesSection';

type CheckStoreSectionProps = {
  getCategoryDetails: (slug: string) => Promise<void>,
};

const CheckStoreSection = (props: CheckStoreSectionProps) => {
  const {
    getCategoryDetails,
  } = props;

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | ProductCategoryGroup | undefined>(undefined);
  const [createCategory, setCreateCategory] = useState<{
    enabled: boolean,
    isGroup: boolean,
    groupId?: number,
  }>({
    enabled: false,
    isGroup: false,
    groupId: undefined, 
  });

  const onClickCreateBtn = (isGroup: boolean, groupId?: number) => {
    setCreateCategory({ enabled: true, isGroup, groupId });
  };

  const onClickUpdateBtn = (category: ProductCategory | ProductCategoryGroup) => {
    setSelectedCategory(category);
  };

  const onSuccessCreate = () => {
    setCreateCategory({ enabled: false, isGroup: false, groupId: undefined });
  };

  const onSuccessUpdate = () => {
    setSelectedCategory(undefined);
  };

  const onSuccessDelete = () => {
    setSelectedCategory(undefined);
  };

  const onCancel = () => {
    setSelectedCategory(undefined);
    setCreateCategory({ enabled: false, isGroup: false, groupId: undefined });
  };

  return (
    <Box>
      { (!selectedCategory && !createCategory.enabled) &&
        <CheckCategoriesSection
          onClickUpdateBtn={onClickUpdateBtn}
          onClickCreateBtn={onClickCreateBtn}
        />
      }
      { (selectedCategory && !createCategory.enabled) &&
        <ManagePCategoryForm
          action={ManageActions.update}
          productCategory={selectedCategory}
          onSubmitSuccess={onSuccessUpdate}
          onDeleteSuccess={onSuccessDelete}
          onCancel={onCancel}
        />
      }
      { (!selectedCategory && createCategory.enabled) &&
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
