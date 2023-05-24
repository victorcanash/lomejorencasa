// import { useRouter } from 'next/router'

import { FormFieldTypes } from '@core/constants/forms';
import { OrderEmailTypes } from '@core/constants/admin';
import type { Order, OrderSendEmail } from '@core/types/orders';

import useForms from '@lib/hooks/useForms';
import useOrders from '@lib/hooks/useOrders';
import BaseForm from '@components/forms/BaseForm';
import { getOrderEmailValue } from '@core/utils/admin';

type SendOrderEmailFormProps = {
  onSubmitSuccess?: (order: Order) => void,
  onCancel?: () => void,
};

const SendOrderEmailForm = (props: SendOrderEmailFormProps) => {
  const { onSubmitSuccess, onCancel } = props;

  // const router = useRouter();

  const { sendOrderEmailFormValidation, orderFieldsInitValues, emailsFieldsInitValues } = useForms();
  const { sendOrderEmail, errorMsg, successMsg } = useOrders();

  const handleSubmit = async (values: OrderSendEmail) => {
    sendOrderEmail(values, onSubmitSuccess);
  };

  const handleCancelBtn = () => {
    if (onCancel) {
      onCancel();
    };
  };

  return (
    <BaseForm 
      initialValues={{
        bigbuyId: orderFieldsInitValues.bigbuyId,
        locale: emailsFieldsInitValues.locale,
        emailType: OrderEmailTypes.issued,
      } as OrderSendEmail}
      validationSchema={sendOrderEmailFormValidation}
      formFieldGroups={[
        {
          titleTxt: {
            id: 'forms.sendOrderEmail.title',
          },
          formFields: [
            {
              name: 'bigbuyId',
              type: FormFieldTypes.text,
              required: true, 
            },
            {
              name: 'locale',
              type: FormFieldTypes.select,
              required: true,
              /*menuItems: router.locales?.map((locale) => {
                return {
                  text: {
                    id: locale,
                  },
                  value: locale,
                };
              }) | undefined,*/ 
              menuItems: [
                {
                  text: {
                    id: 'es',
                  },
                  value: 'es',
                }
              ],       
            },
            {
              name: 'emailType',
              type: FormFieldTypes.select,
              required: true,
              menuItems: Object.keys(OrderEmailTypes).map((key) => {
                return {
                  text: {
                    id: key,
                  },
                  value: getOrderEmailValue(key),
                };
              }),
            },
          ],
        }
      ]}
      formButtons={{
        submit: {
          text: {
            id: 'app.sendBtn',
          },
          onSubmit: handleSubmit,
        },
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

export default SendOrderEmailForm;
