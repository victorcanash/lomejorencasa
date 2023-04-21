import { useCallback } from 'react';

import { FormFieldTypes } from '@core/constants/forms';
import type { Order, OrderContact } from '@core/types/orders';

import type { FormButtonsNormal } from '@lib/types/forms';
import useForms from '@lib/hooks/useForms';
import BaseForm from '@components/forms/BaseForm';

type GetOrderFormProps = {
  getOrder: (orderContact: OrderContact, onSuccess?: ((order: Order) => void) | undefined, onError?: ((errorMsg: string) => void) | undefined) => Promise<void>,
  onSuccess: (order: Order) => void,
  successMsg: string,
  errorMsg: string,
};

const GetOrderForm = (props: GetOrderFormProps) => {
  const {
    getOrder,
    onSuccess,
    successMsg,
    errorMsg,
  } = props;

  const { getOrderFormValidation, orderFieldsInitValues } = useForms();

  const handleSubmit = useCallback(async (values: OrderContact) => {
    getOrder(values, onSuccess);
  }, [getOrder, onSuccess]);

  return (
    <BaseForm 
      initialValues={{
        orderId: orderFieldsInitValues.bigbuyId,
        guestUserEmail: orderFieldsInitValues.guestUserEmail,
      } as OrderContact}
      validationSchema={getOrderFormValidation}
      formFieldGroups={[
        {
          descriptionTxt: {
            id: 'forms.getOrder.description',
          },
          formFields: [
            {
              name: 'orderId',
              type: FormFieldTypes.text,
              required: true,
              autoFocus: true,
            },
            {
              name: 'guestUserEmail',
              type: FormFieldTypes.text,
              required: true,
            },
          ],
        }
      ]}
      formButtons={{
        submit: {
          text: {
            id: 'forms.getOrder.successBtn',
          },
          onSubmit: handleSubmit,
        },
      } as FormButtonsNormal}
      successMsg={successMsg}
      errorMsg={errorMsg}
    />
  );
};

export default GetOrderForm;
