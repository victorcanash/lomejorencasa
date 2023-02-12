import { FormFieldTypes } from '@core/constants/forms';
import type { Order, OrderContact } from '@core/types/orders';

import type { FormButtonsNormal } from '@lib/types/forms';
import useForms from '@lib/hooks/useForms';
import useOrders from '@lib/hooks/useOrders';
import BaseForm from '@components/forms/BaseForm';

type GetOrderFormProps = {
  onSuccess: (order: Order) => void,
}

const GetOrderForm = (props: GetOrderFormProps) => {
  const { onSuccess } = props;

  const { getOrderFormValidation, orderFieldsInitValues } = useForms();
  const { getUnloggedOrder, successMsg, errorMsg } = useOrders();

  const handleSubmit = async (values: OrderContact) => {
    getUnloggedOrder(values, onSuccess);
  };

  return (
    <BaseForm 
      initialValues={{
        orderId: orderFieldsInitValues.bigbuyId,
        guestUserEmail: orderFieldsInitValues.guestUserEmail,
      } as OrderContact}
      validationSchema={getOrderFormValidation}
      formFieldGroups={[
        {
          titleTxt: {
            id: 'forms.getOrder.title',
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