// import { useRouter } from 'next/router'

import { FormFieldTypes } from '@core/constants/forms'
import type { Order, OrderFailedSendEmail } from '@core/types/orders'

import useForms from '@core/hooks/useForms'
import useOrders from '@core/hooks/useOrders'
import BaseForm from '@core/components/forms/BaseForm'

interface SendFailedOrderEmailFormProps {
  onSubmitSuccess?: (order: Order) => void
  onCancel?: () => void
}

const SendFailedOrderEmailForm = (props: SendFailedOrderEmailFormProps) => {
  const { onSubmitSuccess, onCancel } = props

  // const router = useRouter();

  const { sendFailedOrderEmailFormValidation, orderFieldsInitValues, emailsFieldsInitValues } = useForms()
  const { sendFailedOrderEmail, errorMsg, successMsg } = useOrders()

  const handleSubmit = async (values: OrderFailedSendEmail) => {
    void sendFailedOrderEmail(values, onSubmitSuccess)
  }

  const handleCancelBtn = () => {
    if (onCancel != null) {
      onCancel()
    };
  }

  return (
    <BaseForm
      initialValues={{
        orderId: orderFieldsInitValues.id,
        locale: emailsFieldsInitValues.locale,
        currency: orderFieldsInitValues.currency
      }}
      validationSchema={sendFailedOrderEmailFormValidation}
      formFieldGroups={[
        {
          titleTxt: {
            id: 'forms.sendFailedOrderEmail.title'
          },
          formFields: [
            {
              name: 'orderId',
              type: FormFieldTypes.numeric,
              required: true
            },
            {
              name: 'locale',
              type: FormFieldTypes.select,
              required: true,
              /* menuItems: router.locales?.map((locale) => {
                return {
                  text: {
                    id: locale,
                  },
                  value: locale,
                };
              }) | undefined, */
              menuItems: [
                {
                  text: {
                    id: 'es'
                  },
                  value: 'es'
                }
              ]
            },
            {
              name: 'currency',
              type: FormFieldTypes.text,
              required: true,
              disabled: true
            }
          ]
        }
      ]}
      formButtons={{
        submit: {
          text: {
            id: 'app.sendBtn'
          },
          onSubmit: handleSubmit
        },
        cancel: {
          text: {
            id: 'app.cancelBtn'
          },
          onClick: handleCancelBtn
        }
      }}
      successMsg={successMsg}
      errorMsg={errorMsg}
    />
  )
}

export default SendFailedOrderEmailForm
