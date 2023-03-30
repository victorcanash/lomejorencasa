import { FormFieldTypes } from '@core/constants/forms';
import type { GuestCartItem } from '@core/types/cart';

import type { FormButtonsNormal } from '@lib/types/forms';
import useForms from '@lib/hooks/useForms';
import BaseForm from '@components/forms/BaseForm';

type CreateFailedOrderProductFormProps = {
  onSubmitSuccess: (orderProduct: GuestCartItem) => void,
};

const CreateFailedOrderProductForm = (props: CreateFailedOrderProductFormProps) => {
  const { onSubmitSuccess } = props;

  const { createFailedOrderProductFormValidation, orderProductFieldsInitValues } = useForms();

  const handleSubmit = async (values: GuestCartItem) => {
    onSubmitSuccess({
      ...values,
      inventoryId: values.inventoryId !== -1 ? values.inventoryId : undefined,
      packId: values.packId !== -1 ? values.packId : undefined,
    })
  };

  return (
    <BaseForm 
      initialValues={orderProductFieldsInitValues as GuestCartItem}
      validationSchema={createFailedOrderProductFormValidation}
      formFieldGroups={[
        {
          titleTxt: {
            id: 'forms.createFailedOrderProduct.title',
          },
          formFields: [
            {
              name: 'quantity',
              type: FormFieldTypes.numeric,
              required: true, 
            },
            {
              name: 'inventoryId',
              type: FormFieldTypes.numeric,
              required: true,
            },
            {
              name: 'packId',
              type: FormFieldTypes.numeric,
              required: true,
            }
          ],
        }
      ]}
      formButtons={{
        submit: {
          text: {
            id: 'forms.createFailedOrderProduct.successBtn',
          },
          onSubmit: handleSubmit,
        },
      } as FormButtonsNormal}
    />
  );
};

export default CreateFailedOrderProductForm;
