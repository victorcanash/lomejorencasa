import { ManageActions } from '@core/constants/app';
import { FormFieldTypes } from '@core/constants/forms';
import type { ProductDiscount, Product } from '@core/types/products';

import useForms from '@core/hooks/useForms';
import useAdminStore from '@core/hooks/useAdminStore';
import BaseForm from '@core/components/forms/BaseForm';

type ManagePDiscountFormProps = {
  action: ManageActions.create | ManageActions.update,
  product: Product,
  productDiscount?: ProductDiscount,
  onSubmitSuccess?: (productDiscount: ProductDiscount) => void,
  onDeleteSuccess?: () => void,
  onCancel?: () => void,
};

const ManagePDiscountForm = (props: ManagePDiscountFormProps) => {
  const { 
    action, 
    product, 
    productDiscount,
    onSubmitSuccess, 
    onDeleteSuccess,
    onCancel,
  } = props;

  const { manageDiscountFormValidation, discountFieldsInitValues } = useForms();
  const { manageProductDiscount, errorMsg, successMsg } = useAdminStore();

  const handleSubmit = async (values: ProductDiscount) => {
    if (action == ManageActions.create) {
      if (onSubmitSuccess) {
        onSubmitSuccess(values);
      }
    } else if (action == ManageActions.update) {
      manageProductDiscount(action, values, onSubmitSuccess);
    }
  };

  const handleDeleteBtn = () => {
    if (productDiscount) {
      manageProductDiscount(ManageActions.delete, productDiscount, onDeleteSuccess);
    }
  };

  const handleCancelBtn = () => {
    if (onCancel) {
      onCancel();
    }
  }

  return (
    <BaseForm 
      initialValues={{
        ...productDiscount,
        id: productDiscount?.id || -1,
        productId: product.id,
        name: productDiscount?.name || discountFieldsInitValues.name,
        description: productDiscount?.description || discountFieldsInitValues.description,
        discountPercent: productDiscount?.discountPercent || discountFieldsInitValues.discountPercent,
        active: productDiscount?.active || discountFieldsInitValues.active,
      } as ProductDiscount}
      validationSchema={manageDiscountFormValidation}
      enableReinitialize={true}
      formFieldGroups={[
        {
          titleTxt: {
            id: action == ManageActions.create ? 
              'forms.createDiscount.title' : 'forms.updateDiscount.title',
          },
          formFields: [
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
            },
            {
              name: 'discountPercent',
              type: FormFieldTypes.decimal,
              required: true,
              adornment: {
                value: '%',
                position: 'end',
              },
            },
            {
              name: 'active',
              type: FormFieldTypes.checkbox,
            }
          ],
        }
      ]}
      formButtons={{
        submit: {
          text: { 
            id: action == ManageActions.create ?
              'forms.createDiscount.successBtn' : 'forms.updateDiscount.successBtn',
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

export default ManagePDiscountForm;
