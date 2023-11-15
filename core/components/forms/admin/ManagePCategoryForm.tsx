import { useState } from 'react'

import { ManageActions } from '@core/constants/app'
import { FormFieldTypes } from '@core/constants/forms'
import type { FormField } from '@core/types/forms'
import type { ManageProductCategory, ProductCategory, ProductCategoryGroup } from '@core/types/products'

import { useAdminContext } from '@core/contexts/AdminContext'
import useForms from '@core/hooks/useForms'
import useAdminStore from '@core/hooks/useAdminStore'
import BaseForm from '@core/components/forms/BaseForm'

interface ManagePCategoryFormProps {
  action: ManageActions.create | ManageActions.update
  initIsCategoryGroup?: boolean
  initCategoryGroupId?: number
  productCategory?: ProductCategory | ProductCategoryGroup
  onSubmitSuccess?: (productCategory: ProductCategory) => void
  onDeleteSuccess?: () => void
  onCancel?: () => void
}

const ManagePCategoryForm = (props: ManagePCategoryFormProps) => {
  const {
    action,
    initIsCategoryGroup,
    initCategoryGroupId,
    productCategory,
    onSubmitSuccess,
    onDeleteSuccess,
    onCancel
  } = props

  const { checkCategoryGroups } = useAdminContext()

  const { manageCategoryFormValidation, categoryFieldsInitValues } = useForms()
  const { manageProductCategory, errorMsg, successMsg } = useAdminStore()

  const [isCategoryGroup, setIsCategoryGroup] = useState(((initIsCategoryGroup ?? false) || (((productCategory as ProductCategoryGroup)?.categories) != null)) ? true : undefined)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    if (event.target.id === 'isCategoryGroup') {
      setIsCategoryGroup(event.target.checked)
    }
  }

  const handleSubmit = async (values: ManageProductCategory) => {
    void manageProductCategory(
      action,
      {
        ...values,
        categoryGroupId: values.categoryGroupId === -1
          ? undefined
          : values.categoryGroupId
      },
      onSubmitSuccess
    )
  }

  const handleDeleteBtn = () => {
    if (productCategory != null) {
      void manageProductCategory(
        ManageActions.delete,
        {
          ...productCategory,
          isCategoryGroup
        },
        onDeleteSuccess
      )
    }
  }

  const handleCancelBtn = () => {
    if (onCancel != null) {
      onCancel()
    }
  }

  return (
    <BaseForm
      initialValues={{
        id: productCategory?.id ?? -1,
        isCategoryGroup: !!(((initIsCategoryGroup ?? false) || (((productCategory as ProductCategoryGroup)?.categories) != null))),
        categoryGroupId: initCategoryGroupId ?? (productCategory as ProductCategory)?.categoryGroupId ?? -1,
        slug: productCategory?.slug ?? categoryFieldsInitValues.slug,
        name: productCategory?.name ?? categoryFieldsInitValues.name,
        description: productCategory?.description ?? categoryFieldsInitValues.description,
        image: productCategory?.image ?? categoryFieldsInitValues.image
      }}
      validationSchema={manageCategoryFormValidation}
      enableReinitialize={true}
      onChange={handleChange}
      formFieldGroups={[
        {
          titleTxt: {
            id: action === ManageActions.create
              ? 'forms.createCategory.title'
              : 'forms.updateCategory.title'
          },
          formFields: ([
            {
              name: 'name.en',
              type: FormFieldTypes.text,
              required: true
            },
            {
              name: 'name.es',
              type: FormFieldTypes.text,
              required: true
            },
            {
              name: 'description.en',
              type: FormFieldTypes.text,
              required: true
            },
            {
              name: 'description.es',
              type: FormFieldTypes.text,
              required: true
            },
            {
              name: 'slug',
              type: FormFieldTypes.text,
              required: true
            },
            {
              name: 'image',
              type: FormFieldTypes.text
            },
            {
              name: 'isCategoryGroup',
              type: FormFieldTypes.checkbox
            }
          ] as FormField[]).concat(!(isCategoryGroup ?? false)
            ? [
                {
                  name: 'categoryGroupId',
                  type: FormFieldTypes.select,
                  menuItems: [
                    {
                      text: {
                        id: 'forms.withoutGroupCategoryName'
                      },
                      value: -1
                    }
                  ].concat(checkCategoryGroups.map((checkCategoryGroup) => {
                    return {
                      text: {
                        id: 'forms.groupCategoryName',
                        values: {
                          name: checkCategoryGroup.categoryGroup.name.current
                        }
                      },
                      value: checkCategoryGroup.categoryGroup.id
                    }
                  }))
                }
              ]
            : [])
        }
      ]}
      formButtons={{
        submit: {
          text: {
            id: action === ManageActions.create
              ? 'forms.createCategory.successBtn'
              : 'forms.updateCategory.successBtn'
          },
          onSubmit: handleSubmit
        },
        delete: action === ManageActions.update
          ? {
              text: {
                id: 'app.deleteBtn'
              },
              onClick: handleDeleteBtn,
              confirm: {
                enabled: true
              }
            }
          : undefined,
        cancel: {
          text: {
            id: 'app.cancelBtn'
          },
          onClick: handleCancelBtn
        }
      }}
      successMsg={successMsg}
      errorMsg={errorMsg}
    />
  )
}

export default ManagePCategoryForm
