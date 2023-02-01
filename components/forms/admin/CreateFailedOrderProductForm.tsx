import { FormFieldTypes } from '@core/constants/forms';
import type { OrderProductFailedCreate } from '@core/types/orders';

import type { FormButtonsNormal } from '@lib/types/forms';
import useForms from '@lib/hooks/useForms';
import BaseForm from '@components/forms/BaseForm';

type CreateFailedOrderProductFormProps = {
  onSubmitSuccess: (orderProduct: OrderProductFailedCreate) => void,
};

const CreateFailedOrderProductForm = (props: CreateFailedOrderProductFormProps) => {
  const { onSubmitSuccess } = props;

  const { createFailedOrderProductFormValidation, orderProductFieldsInitValues } = useForms();

  const handleSubmit = async (values: OrderProductFailedCreate) => {
    onSubmitSuccess(values)
  };

  return (
    <BaseForm 
      initialValues={orderProductFieldsInitValues as OrderProductFailedCreate}
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
