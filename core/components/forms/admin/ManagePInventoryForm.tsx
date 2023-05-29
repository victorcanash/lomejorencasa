import { ManageActions } from '@core/constants/app';
import { FormFieldTypes } from '@core/constants/forms';
import type { ProductInventory, Product } from '@core/types/products';

import useForms from '@core/hooks/useForms';
import useProducts from '@core/hooks/useProducts';
import BaseForm from '@core/components/forms/BaseForm';

type ManagePInventoryFormProps = {
  action: ManageActions.create | ManageActions.update,
  product: Product,
  productInventory?: ProductInventory,
  manageOnSubmit: boolean,
  onSubmitSuccess?: (productInventory: ProductInventory) => void,
  onDeleteSuccess?: () => void,
  onCancel?: () => void,
};

const ManagePInventoryForm = (props: ManagePInventoryFormProps) => {
  const { 
    action, 
    product, 
    productInventory,
    manageOnSubmit, 
    onSubmitSuccess, 
    onDeleteSuccess,
    onCancel,
  } = props;

  const { manageInventoryFormValidation, inventoryFieldsInitValues } = useForms();
  const { manageProductInventory, errorMsg, successMsg } = useProducts();

  const handleSubmit = async (values: ProductInventory) => {
    if (manageOnSubmit) {
      manageProductInventory(action, values, onSubmitSuccess);
    } else {
      if (onSubmitSuccess) {
        onSubmitSuccess(values);
      }
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
        id: productInventory?.id || -1,
        productId: product.id,
        sku: productInventory?.sku || inventoryFieldsInitValues.sku,
        name: productInventory?.name || inventoryFieldsInitValues.name,
        description: productInventory?.description || inventoryFieldsInitValues.description,
        price: productInventory?.price || inventoryFieldsInitValues.price,
        quantity: productInventory?.quantity || inventoryFieldsInitValues.quantity,
        realPrice: productInventory?.realPrice || 0,
        bigbuy: {
          id: productInventory?.bigbuy.id || '',
          name: productInventory?.bigbuy.name || '',
          description: productInventory?.bigbuy.description || '',
          price: productInventory?.bigbuy.price || 0,
          quantity: productInventory?.bigbuy.quantity || 0,
        },
        product: productInventory?.product || {} as Product,
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
              autoFocus: true,
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
            }
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
