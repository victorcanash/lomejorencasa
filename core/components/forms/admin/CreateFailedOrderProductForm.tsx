import { FormFieldTypes } from '@core/constants/forms'
import type { GuestCartItem } from '@core/types/cart'

import useForms from '@core/hooks/useForms'
import BaseForm from '@core/components/forms/BaseForm'

interface CreateFailedOrderProductFormProps {
  onSubmitSuccess: (orderProduct: GuestCartItem) => void
}

const CreateFailedOrderProductForm = (props: CreateFailedOrderProductFormProps) => {
  const { onSubmitSuccess } = props

  const { createFailedOrderProductFormValidation, orderProductFieldsInitValues } = useForms()

  const handleSubmit = async (values: GuestCartItem) => {
    onSubmitSuccess({
      ...values,
      inventoryId: values.inventoryId !== -1 ? values.inventoryId : undefined,
      packId: values.packId !== -1 ? values.packId : undefined
    })
  }

  return (
    <BaseForm
      initialValues={orderProductFieldsInitValues}
      validationSchema={createFailedOrderProductFormValidation}
      formFieldGroups={[
        {
          titleTxt: {
            id: 'forms.createFailedOrderProduct.title'
          },
          formFields: [
            {
              name: 'quantity',
              type: FormFieldTypes.numeric,
              required: true
            },
            {
              name: 'inventoryId',
              type: FormFieldTypes.numeric,
              required: true
            },
            {
              name: 'packId',
              type: FormFieldTypes.numeric,
              required: true
            }
          ]
        }
      ]}
      formButtons={{
        submit: {
          text: {
            id: 'forms.createFailedOrderProduct.successBtn'
          },
          onSubmit: handleSubmit
        }
      }}
    />
  )
}

export default CreateFailedOrderProductForm
