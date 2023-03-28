import { MutableRefObject, useState } from 'react';

import { FormikProps } from 'formik';

import { FormFieldTypes } from '@core/constants/forms';
import { AddressTypes } from '@core/constants/addresses';
import type { CheckoutContact } from '@core/types/checkout';
import type { User } from '@core/types/user';

import { useAuthContext } from '@lib/contexts/AuthContext';
import useForms from '@lib/hooks/useForms';
import BaseForm from '@components/forms/BaseForm';

type CheckoutContactFormProps = {
  formikRef: MutableRefObject<FormikProps<CheckoutContact> | null>,
};

const CheckoutContactForm = (props: CheckoutContactFormProps) => {
  const { formikRef } = props;

  const { user, checkoutData, isLogged } = useAuthContext();

  const {
    checkoutContactFormValidation,
    userFieldsInitValues,
    addressFieldsInitValues,
    orderFieldsInitValues,
    addressFormFields,
  } = useForms();

  const [hiddenBilling, setHiddenBilling] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    if (event.target.id === 'sameAsShipping') {
      if (event.target.checked) {
        formikRef.current?.setFieldValue('billing.firstName', formikRef.current?.values.billing.firstName);
        formikRef.current?.setFieldValue('billing.lastName', formikRef.current?.values.shipping.lastName);
        formikRef.current?.setFieldValue('billing.addressLine1', formikRef.current?.values.shipping.addressLine1);
        formikRef.current?.setFieldValue('billing.addressLine2', formikRef.current?.values.shipping.addressLine2);
        formikRef.current?.setFieldValue('billing.postalCode', formikRef.current?.values.shipping.postalCode);
        formikRef.current?.setFieldValue('billing.locality', formikRef.current?.values.shipping.locality);
        formikRef.current?.setFieldValue('billing.country', formikRef.current?.values.shipping.country);
      }
      setHiddenBilling(event.target.checked);
    }
  };

  const maxWidth = '600px';

  return (
    <BaseForm
      formikRef={formikRef}
      maxWidth={maxWidth}
      initialValues={{
        shipping: {
          id: user.shipping?.id || -1,
          userId: user.shipping?.userId || (user as User)?.id || -1,
          type: user.shipping?.type || AddressTypes.shipping,
          firstName: user.shipping?.firstName || (user as User)?.firstName || addressFieldsInitValues.firstName,
          lastName: user.shipping?.lastName || (user as User)?.lastName || addressFieldsInitValues.lastName,
          addressLine1: user.shipping?.addressLine1 || addressFieldsInitValues.addressLine1,
          addressLine2: user.shipping?.addressLine2 || addressFieldsInitValues.addressLine2,
          postalCode: user.shipping?.postalCode || addressFieldsInitValues.postalCode,
          locality: user.shipping?.locality || addressFieldsInitValues.locality,
          country: user.shipping?.country || addressFieldsInitValues.country,
        },
        billing: {
          id: user.billing?.id || -1,
          userId: user.billing?.userId || (user as User)?.id || -1,
          type: user.billing?.type || AddressTypes.billing,
          firstName: user.billing?.firstName || (user as User)?.firstName || addressFieldsInitValues.firstName,
          lastName: user.billing?.lastName || (user as User)?.lastName || addressFieldsInitValues.lastName,
          addressLine1: user.billing?.addressLine1 || addressFieldsInitValues.addressLine1,
          addressLine2: user.billing?.addressLine2 || addressFieldsInitValues.addressLine2,
          postalCode: user.billing?.postalCode || addressFieldsInitValues.postalCode,
          locality: user.billing?.locality || addressFieldsInitValues.locality,
          country: user.billing?.country || addressFieldsInitValues.country,
        },
        sameAsShipping: checkoutData.sameAsShipping || false,
        checkoutEmail: user.email || userFieldsInitValues.email,
        notes: checkoutData.notes || orderFieldsInitValues.notes,
      } as CheckoutContact}
      validationSchema={checkoutContactFormValidation}
      enableReinitialize={true}
      onChange={handleChange}
      formFieldGroups={[
        {
          titleTxt: {
            id: 'forms.shipping',
            textAlign: 'center',
          },
          formFields: addressFormFields(AddressTypes.shipping),
        },
        {
          titleTxt: {
            id: 'forms.billing',
            textAlign: 'center',
          },
          formFields: !hiddenBilling ?
            [
              {
                name: 'sameAsShipping',
                type: FormFieldTypes.checkbox,
              },
              ...addressFormFields(AddressTypes.billing)
            ]
            :
            [
              {
                name: 'sameAsShipping',
                type: FormFieldTypes.checkbox,
              },
            ],
        },
        {
          titleTxt: {
            id: 'forms.checkoutContact',
            textAlign: 'center',
          },
          formFields: [
            {
              name: 'checkoutEmail',
              type: FormFieldTypes.text,
              required: true,
              autoComplete: 'email',
              disabled: isLogged(),
            },
            {
              name: 'notes',
              type: FormFieldTypes.text,
            },
          ],
        }
      ]}
    />
  );
};

export default CheckoutContactForm;
