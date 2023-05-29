import { useCallback } from 'react';

import { FormFieldTypes } from '@core/constants/forms';
import type { Order, OrderContact } from '@core/types/orders';

import { pages } from '@lib/config/navigation.config';
import useForms from '@core/hooks/useForms';
import BaseForm from '@core/components/forms/BaseForm';

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
      }}
      linksItems={[
        {
          text: {
            id: 'forms.getOrder.contactLink',
          },
          path: pages.contact.path,
        }
      ]}
      successMsg={successMsg}
      errorMsg={errorMsg}
    />
  );
};

export default GetOrderForm;
