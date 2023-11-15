import { useState } from 'react'

import { ManageActions } from '@core/constants/app'
import type { CheckCategory, CheckCategoryGroup } from '@core/types/admin'
import ManagePCategoryForm from '@core/components/forms/admin/ManagePCategoryForm'
import CheckCategoriesList from './CheckCategoriesList'

interface CheckCategoriesSectionProps {
  onClickSelectBtn: (checkCategory: CheckCategory) => void
}

const CheckCategoriesSection = (props: CheckCategoriesSectionProps) => {
  const {
    onClickSelectBtn
  } = props

  const [updateCategory, setUpdateCategory] = useState<CheckCategory | CheckCategoryGroup | undefined>(undefined)
  const [createCategory, setCreateCategory] = useState<{
    enabled: boolean
    isGroup: boolean
    groupId?: number
  }>({
    enabled: false,
    isGroup: false,
    groupId: undefined
  })

  const onClickCreateBtn = (isGroup: boolean, groupId?: number) => {
    setCreateCategory({ enabled: true, isGroup, groupId })
  }

  const onClickUpdateBtn = (checkCategory: CheckCategory | CheckCategoryGroup) => {
    setUpdateCategory(checkCategory)
  }

  const onSuccessCreate = () => {
    setCreateCategory({ enabled: false, isGroup: false, groupId: undefined })
  }

  const onSuccessUpdate = () => {
    setUpdateCategory(undefined)
  }

  const onSuccessDelete = () => {
    setUpdateCategory(undefined)
  }

  const onCancel = () => {
    setUpdateCategory(undefined)
    setCreateCategory({ enabled: false, isGroup: false, groupId: undefined })
  }

  return (
    <>
      { ((updateCategory == null) && !createCategory.enabled) &&
        <CheckCategoriesList
          onClickSelectBtn={onClickSelectBtn}
          onClickCreateBtn={onClickCreateBtn}
          onClickUpdateBtn={onClickUpdateBtn}
        />
      }

      { ((updateCategory != null) && !createCategory.enabled) &&
        <ManagePCategoryForm
          action={ManageActions.update}
          productCategory={(updateCategory as CheckCategory)?.category ?? (updateCategory as CheckCategoryGroup).categoryGroup}
          initIsCategoryGroup={(updateCategory as CheckCategory)?.category == null}
          onSubmitSuccess={onSuccessUpdate}
          onDeleteSuccess={onSuccessDelete}
          onCancel={onCancel}
        />
      }

      { ((updateCategory == null) && createCategory.enabled) &&
        <ManagePCategoryForm
          action={ManageActions.create}
          initIsCategoryGroup={createCategory.isGroup}
          initCategoryGroupId={createCategory.groupId}
          onSubmitSuccess={onSuccessCreate}
          onCancel={onCancel}
        />
      }
    </>
  )
}

export default CheckCategoriesSection
