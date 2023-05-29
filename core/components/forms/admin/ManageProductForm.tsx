import { ManageActions } from '@core/constants/app';
import { FormFieldTypes } from '@core/constants/forms';
import type { Product } from '@core/types/products';

import { useSearchContext } from '@lib/contexts/SearchContext';
import useForms from '@lib/hooks/useForms';
import useProducts from '@lib/hooks/useProducts';
import BaseForm from '@core/components/forms/BaseForm';

type ManageProductFormProps = {
  action: ManageActions.create | ManageActions.update,
  product?: Product,
  onSubmitSuccess?: (product: Product) => void,
  onDeleteSuccess?: () => void,
  onCancel?: () => void,
};

const ManageProductForm = (props: ManageProductFormProps) => {
  const { 
    action, 
    product, 
    onSubmitSuccess, 
    onDeleteSuccess,
    onCancel,
  } = props;

  const { productCategories } = useSearchContext();

  const { manageProductFormValidation, productFieldsInitValues } = useForms();
  const { updateProduct, deleteProduct, errorMsg, successMsg } = useProducts();

  const handleSubmit = async (values: Product) => {
    if (action == ManageActions.create) {
      if (onSubmitSuccess) {
        onSubmitSuccess(values);
      }
    } else if (action == ManageActions.update) {
      updateProduct(values, onSubmitSuccess);
    }
  };

  const handleDeleteBtn = () => {
    if (product) {
      deleteProduct(product, onDeleteSuccess);
    }
  };

  const handleCancelBtn = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const maxWidth = '500px';

  return (
    <>
      <BaseForm
        maxWidth={maxWidth} 
        initialValues={{
          id: product?.id || -1,
          categoryId: product?.categoryId || productCategories[0].id,
          name: product?.name || productFieldsInitValues.name,
          description: product?.description || productFieldsInitValues.description,
          lowestPrice: product?.lowestPrice || 0,
          lowestRealPrice: product?.lowestRealPrice || 0,
          inventories: product ? product.inventories : [],
        } as Product}
        validationSchema={manageProductFormValidation}
        enableReinitialize={true}
        formFieldGroups={[
          {
            titleTxt: {
              id: action == ManageActions.create ? 
                'forms.createProduct.title' : 'forms.updateProduct.title',
            },
            formFields: [
              {
                name: 'categoryId',
                type: FormFieldTypes.select,
                required: true,
                menuItems: productCategories.map((category) => {
                  return {
                    text: {
                      id: "forms.categoryName",
                      values: {
                        name: category.name.current
                      }
                    },
                    value: category.id,
                  };
                }),
              },
              {
                name: 'name.en',
                type: FormFieldTypes.text,
                required: true,
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
                'forms.createProduct.successBtn' : 'forms.updateProduct.successBtn',
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
    </>
  );
};

export default ManageProductForm;
