import { type MutableRefObject, useState, type FormEventHandler } from 'react'

import { type FormikProps } from 'formik'

import { FormFieldTypes } from '@core/constants/forms'
import { AddressTypes } from '@core/constants/addresses'
import type { CheckoutContact } from '@core/types/checkout'
import type { User } from '@core/types/user'

import { useAuthContext } from '@core/contexts/AuthContext'
import useForms from '@core/hooks/useForms'
import BaseForm from '@core/components/forms/BaseForm'

interface CheckoutContactFormProps {
  formikRef: MutableRefObject<FormikProps<CheckoutContact> | null>
}

const CheckoutContactForm = (props: CheckoutContactFormProps) => {
  const { formikRef } = props

  const { user, checkoutData, isLogged } = useAuthContext()

  const {
    checkoutContactFormValidation,
    userFieldsInitValues,
    addressFieldsInitValues,
    orderFieldsInitValues,
    addressFormFields
  } = useForms()

  const [hiddenBilling, setHiddenBilling] = useState(checkoutData.sameAsShipping ?? false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange: FormEventHandler<HTMLFormElement> = (event) => {
    if (event.currentTarget.id === 'sameAsShipping') {
      setHiddenBilling(event.currentTarget.checked)
      if (event.currentTarget.checked === true) {
        formikRef.current?.setFieldValue('billing', formikRef.current?.values.shipping)
      }
    } else if ((formikRef.current?.values.sameAsShipping) ?? false) {
      formikRef.current?.setFieldValue('billing', formikRef.current?.values.shipping)
    }
  }

  const maxWidth = '600px'

  return (
    <>
      <BaseForm
        formikRef={formikRef}
        maxWidth={maxWidth}
        initialValues={{
          shipping: {
            id: (user as User)?.shipping?.id ?? checkoutData.shipping?.id ?? -1,
            userId: (user as User)?.shipping?.userId ?? (user as User)?.id ?? -1,
            type: AddressTypes.shipping,
            firstName: (user as User)?.shipping?.firstName ?? (user as User)?.firstName ?? checkoutData.shipping?.firstName ?? addressFieldsInitValues.firstName,
            lastName: (user as User)?.shipping?.lastName ?? (user as User)?.lastName ?? checkoutData.shipping?.lastName ?? addressFieldsInitValues.lastName,
            addressLine1: (user as User)?.shipping?.addressLine1 ?? checkoutData.shipping?.addressLine1 ?? addressFieldsInitValues.addressLine1,
            addressLine2: (user as User)?.shipping?.addressLine2 ?? checkoutData.shipping?.addressLine2 ?? addressFieldsInitValues.addressLine2,
            postalCode: (user as User)?.shipping?.postalCode ?? checkoutData.shipping?.postalCode ?? addressFieldsInitValues.postalCode,
            locality: (user as User)?.shipping?.locality ?? checkoutData.shipping?.locality ?? addressFieldsInitValues.locality,
            country: (((user as User)?.shipping?.country) != null) ?? ((checkoutData.shipping?.country) != null) ?? addressFieldsInitValues.country
          },
          billing: {
            id: (user as User)?.billing?.id ?? checkoutData.billing?.id ?? -1,
            userId: (user as User)?.billing?.userId ?? (user as User)?.id ?? -1,
            type: AddressTypes.billing,
            firstName: (user as User)?.billing?.firstName ?? (user as User)?.firstName ?? checkoutData.billing?.firstName ?? addressFieldsInitValues.firstName,
            lastName: (user as User)?.billing?.lastName ?? (user as User)?.lastName ?? checkoutData.billing?.lastName ?? addressFieldsInitValues.lastName,
            addressLine1: (user as User)?.billing?.addressLine1 ?? checkoutData.billing?.addressLine1 ?? addressFieldsInitValues.addressLine1,
            addressLine2: (user as User)?.billing?.addressLine2 ?? checkoutData.billing?.addressLine2 ?? addressFieldsInitValues.addressLine2,
            postalCode: (user as User)?.billing?.postalCode ?? checkoutData.billing?.postalCode ?? addressFieldsInitValues.postalCode,
            locality: (user as User)?.billing?.locality ?? checkoutData.billing?.locality ?? addressFieldsInitValues.locality,
            country: (((user as User)?.billing?.country) != null) ?? ((checkoutData.billing?.country) != null) ?? addressFieldsInitValues.country
          },
          sameAsShipping: checkoutData.sameAsShipping ?? false,
          checkoutEmail: user.email ?? checkoutData.checkoutEmail ?? userFieldsInitValues.email,
          notes: checkoutData.notes ?? orderFieldsInitValues.notes
        }}
        validationSchema={checkoutContactFormValidation}
        enableReinitialize={true}
        validateOnMount={true}
        onChange={handleChange}
        formFieldGroups={[
          {
            titleTxt: {
              id: 'forms.shipping',
              textAlign: 'center'
            },
            formFields: addressFormFields(AddressTypes.shipping)
          },
          {
            titleTxt: {
              id: 'forms.billing',
              textAlign: 'center'
            },
            formFields: !hiddenBilling
              ? [
                  {
                    name: 'sameAsShipping',
                    type: FormFieldTypes.checkbox
                  },
                  ...addressFormFields(AddressTypes.billing)
                ]
              : [
                  {
                    name: 'sameAsShipping',
                    type: FormFieldTypes.checkbox
                  }
                ]
          },
          {
            titleTxt: {
              id: 'checkout.contact.title',
              textAlign: 'center'
            },
            formFields: [
              {
                name: 'checkoutEmail',
                type: FormFieldTypes.text,
                required: true,
                autoComplete: 'email',
                disabled: isLogged()
              },
              {
                name: 'notes',
                type: FormFieldTypes.text
              }
            ]
          }
        ]}
      />
    </>
  )
}

export default CheckoutContactForm
