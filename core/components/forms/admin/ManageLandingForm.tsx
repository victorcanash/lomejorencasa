import { ManageActions } from '@core/constants/app';
import { FormFieldTypes } from '@core/constants/forms';
import type { Landing } from '@core/types/products';

import { useProductsContext } from '@core/contexts/ProductsContext';
import useForms from '@core/hooks/useForms';
import useProducts from '@core/hooks/useProducts';
import BaseForm from '@core/components/forms/BaseForm';

type ManageLandingFormProps = {
  action: ManageActions.create | ManageActions.update,
  landing?: Landing,
  onSubmitSuccess?: (landing: Landing) => void,
  onDeleteSuccess?: () => void,
  onCancel?: () => void,
};

const ManageLandingForm = (props: ManageLandingFormProps) => {
  const { 
    action, 
    landing, 
    onSubmitSuccess, 
    onDeleteSuccess,
    onCancel,
  } = props;

  const { getAllCategories } = useProductsContext();

  const { manageProductFormValidation, productFieldsInitValues } = useForms();
  const { updateProduct, deleteProduct, errorMsg, successMsg } = useProducts();

  const handleSubmit = async (values: Landing) => {
    if (action == ManageActions.create) {
      if (onSubmitSuccess) {
        onSubmitSuccess(values);
      }
    } else if (action == ManageActions.update) {
      //updateProduct(values, onSubmitSuccess);
    }
  };

  const handleDeleteBtn = () => {
    /*if (product) {
      deleteProduct(product, onDeleteSuccess);
    }*/
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
          id: landing?.id || -1,
          slug: landing?.slug  || getAllCategories()[0].id,
          name: landing?.name || productFieldsInitValues.name,
          description: landing?.description || productFieldsInitValues.description,
        } as Landing}
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
                menuItems: getAllCategories().map((category) => {
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

export default ManageLandingForm;
