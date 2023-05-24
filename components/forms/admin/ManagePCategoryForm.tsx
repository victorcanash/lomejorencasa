import { ManageActions } from '@core/constants/app';
import { FormFieldTypes } from '@core/constants/forms';
import type { ProductCategory } from '@core/types/products';

import useForms from '@lib/hooks/useForms';
import useProducts from '@lib/hooks/useProducts';
import BaseForm from '@components/forms/BaseForm';

type ManagePCategoryFormProps = {
  action: ManageActions.create | ManageActions.update,
  productCategory?: ProductCategory,
  onSubmitSuccess?: (productCategory: ProductCategory) => void,
  onDeleteSuccess?: () => void,
  onCancel?: () => void,
};

const ManagePCategoryForm = (props: ManagePCategoryFormProps) => {
  const { 
    action,
    productCategory,
    onSubmitSuccess, 
    onDeleteSuccess,
    onCancel, 
  } = props;

  const { manageCategoryFormValidation, categoryFieldsInitValues } = useForms();
  const { manageProductCategory, errorMsg, successMsg } = useProducts();

  const handleSubmit = async (values: ProductCategory) => {
    manageProductCategory(action, values, onSubmitSuccess);
  };

  const handleDeleteBtn = () => {
    if (productCategory) {
      manageProductCategory(ManageActions.delete, productCategory, onDeleteSuccess);
    }
  };

  const handleCancelBtn = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <BaseForm 
      initialValues={{
        id: productCategory?.id || -1,
        name: productCategory?.name || categoryFieldsInitValues.name,
        description: productCategory?.description || categoryFieldsInitValues.description,
      } as ProductCategory}
      validationSchema={manageCategoryFormValidation}
      enableReinitialize={true}
      formFieldGroups={[
        {
          titleTxt: {
            id: action == ManageActions.create ? 
              'forms.createCategory.title' : 'forms.updateCategory.title',
          },
          formFields: [
            {
              name: 'name.en',
              type: FormFieldTypes.text,
              required: true,
              autoFocus: true,
            },
            {
              name: 'name.es',
              type: FormFieldTypes.text,
              required: true,
            },
            {
              name: 'description.en',
              type: FormFieldTypes.text,
              required: true,
            },
            {
              name: 'description.es',
              type: FormFieldTypes.text,
              required: true, 
            }
          ],
        }
      ]}
      formButtons={{
        submit: {
          text: { 
            id: action == ManageActions.create ?
              'forms.createCategory.successBtn' : 'forms.updateCategory.successBtn',
          },
          onSubmit: handleSubmit,
        },
        delete: action == ManageActions.update ? 
          { 
            text: {
              id: 'app.deleteBtn',
            },
            onClick: handleDeleteBtn,
            confirm: {
              enabled: true,
            },
          } : undefined,
        cancel: {
          text: {
            id: 'app.cancelBtn',
          },
          onClick: handleCancelBtn,
        },
      }}
      successMsg={successMsg}
      errorMsg={errorMsg}
    />
  );
};

export default ManagePCategoryForm;
