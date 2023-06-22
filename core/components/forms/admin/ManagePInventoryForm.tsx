import { ManageActions } from '@core/constants/app';
import { FormFieldTypes } from '@core/constants/forms';
import type { ProductInventory, Product } from '@core/types/products';

import useForms from '@core/hooks/useForms';
import useAdminStore from '@core/hooks/useAdminStore';
import BaseForm from '@core/components/forms/BaseForm';

type ManagePInventoryFormProps = {
  action: ManageActions.create | ManageActions.update,
  product: Product,
  productInventory?: ProductInventory,
  onSubmitSuccess?: (productInventory: ProductInventory) => void,
  onDeleteSuccess?: () => void,
  onCancel?: () => void,
};

const ManagePInventoryForm = (props: ManagePInventoryFormProps) => {
  const { 
    action, 
    product, 
    productInventory,
    onSubmitSuccess, 
    onDeleteSuccess,
    onCancel,
  } = props;

  const { manageInventoryFormValidation, inventoryFieldsInitValues } = useForms();
  const { manageProductInventory, errorMsg, successMsg } = useAdminStore();

  const handleSubmit = async (values: ProductInventory) => {
    if (action == ManageActions.create) {
      if (onSubmitSuccess) {
        onSubmitSuccess(values);
      }
    } else if (action == ManageActions.update) {
      manageProductInventory(action, values, onSubmitSuccess);
    }
  };

  const handleDeleteBtn = () => {
    if (productInventory) {
      manageProductInventory(ManageActions.delete, productInventory, onDeleteSuccess);
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
        ...productInventory,
        id: productInventory?.id || -1,
        productId: product.id,
        sku: productInventory?.sku || inventoryFieldsInitValues.sku,
        name: productInventory?.name || inventoryFieldsInitValues.name,
        description: productInventory?.description || inventoryFieldsInitValues.description,
        price: productInventory?.price || inventoryFieldsInitValues.price,
        quantity: productInventory?.quantity || inventoryFieldsInitValues.quantity,
        image: productInventory?.image || inventoryFieldsInitValues.image,
        metaId: productInventory?.metaId || inventoryFieldsInitValues.metaId,
      } as ProductInventory}
      validationSchema={manageInventoryFormValidation}
      enableReinitialize={true}
      formFieldGroups={[
        {
          titleTxt: {
            id: action == ManageActions.create ? 
              'forms.createInventory.title' : 'forms.updateInventory.title',
          },
          formFields: [
            {
              name: 'sku',
              type: FormFieldTypes.text,
              required: true,
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
            },
            {
              name: 'price',
              type: FormFieldTypes.decimal,
              required: true,
              adornment: {
                value: '€',
                position: 'end',
              },
            },
            {
              name: 'quantity',
              type: FormFieldTypes.numeric,
              required: true,
            },
            {
              name: 'image',
              type: FormFieldTypes.text,
            },
            {
              name: 'metaId',
              type: FormFieldTypes.text,
            },
          ],
        }
      ]}
      formButtons={{
        submit: {
          text: { 
            id: action == ManageActions.create ?
              'forms.createInventory.successBtn' : 'forms.updateInventory.successBtn',
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

export default ManagePInventoryForm;
