import { useState } from 'react';

import { FormikHelpers } from 'formik';

import { FormFieldTypes } from '@core/constants/forms';
import { AddressTypes } from '@core/constants/addresses';
import type { FormField } from '@core/types/forms';
import type { CheckoutContact } from '@core/types/checkout';
import type { User } from '@core/types/user';

import type { FormButtonsCheckout } from '@lib/types/forms';
import { useAuthContext } from '@lib/contexts/AuthContext';
import useForms from '@lib/hooks/useForms';
import useUser from '@lib/hooks/useUser';
import BaseForm from '@components/forms/BaseForm';

type CheckoutAddressesFormProps = {
  next: () => void,
};

const CheckoutAddressesForm = (props: CheckoutAddressesFormProps) => {
  const { next } = props;

  const { braintreeToken, paypal, user, isLogged } = useAuthContext();

  const { 
    checkoutAddressesFormValidation, 
    addressFieldsInitValues, 
    addressFormFields,
  } = useForms();
  const { updateUserAddresses, errorMsg, successMsg } = useUser();

  const [ hiddenBilling, setHiddenBilling ] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    if (event.target.id === 'sameAsShipping') {
      setHiddenBilling(event.target.checked);
    }
  };

  const handleSubmit = async (values: CheckoutContact, formikHelpers: FormikHelpers<CheckoutContact>, dirty: boolean) => {
    if ((!braintreeToken && !paypal?.advancedCards) ||
        (dirty || !user.shipping || !user.billing)) {
      const checkoutAddresses = {...values};
      if ((!braintreeToken && !paypal?.advancedCards) ||
          (values.sameAsShipping)) {
        checkoutAddresses.billing = {...values.shipping};
        formikHelpers.setFieldValue('billing.firstName', values.shipping.firstName);
        formikHelpers.setFieldValue('billing.lastName', values.shipping.lastName);
        formikHelpers.setFieldValue('billing.addressLine1', values.shipping.addressLine1);
        formikHelpers.setFieldValue('billing.addressLine2', values.shipping.addressLine2);
        formikHelpers.setFieldValue('billing.postalCode', values.shipping.postalCode);
        formikHelpers.setFieldValue('billing.locality', values.shipping.locality);
        formikHelpers.setFieldValue('billing.country', values.shipping.country);
      }
      updateUserAddresses(checkoutAddresses, next);
    } else if (!dirty && user.shipping && user.billing) {
      next();
    }
  };

  const getBillingFields = () => {
    if (!hiddenBilling) {
      return [
        {
          name: 'sameAsShipping',
          type: FormFieldTypes.checkbox,
        },
        ...addressFormFields(AddressTypes.billing)
      ] as FormField[];
    } else { 
      return [
        {
          name: 'sameAsShipping',
          type: FormFieldTypes.checkbox,
        },
      ] as FormField[];
    }
  };

  return (
    <BaseForm
      maxWidth="800px"
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
        sameAsShipping: false,
        email: user.email || '',
      } as CheckoutContact}
      validationSchema={checkoutAddressesFormValidation}
      enableReinitialize={true}
      onChange={handleChange}
      formFieldGroups={(braintreeToken || paypal?.advancedCards) ? 
        [
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
            formFields: getBillingFields(),
          }
        ]
        :
        [
          {
            titleTxt: {
              id: 'forms.shipping',
              textAlign: 'center',
            },
            formFields: !isLogged() ? [
              ...addressFormFields(AddressTypes.shipping),
              {
                name: `email`,
                type: FormFieldTypes.text,
                required: true,
                autoComplete: 'email',
              },
            ] : addressFormFields(AddressTypes.shipping),
          }
        ]
      }
      formButtons={{
        submit: {
          text: { 
            id: 'app.continueBtn',
          },
          onSubmit: handleSubmit,
        },
        back: {
          text: { 
            id: 'app.backBtn',
          },
          disabled: true,
        },
      } as FormButtonsCheckout}
      successMsg={successMsg}
      errorMsg={errorMsg}
    />
  );
};

export default CheckoutAddressesForm;
