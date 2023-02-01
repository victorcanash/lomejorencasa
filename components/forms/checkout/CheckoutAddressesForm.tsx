import { useState } from 'react';

import { FormikHelpers } from 'formik';

import { FormFieldTypes } from '@core/constants/forms';
import { AddressTypes } from '@core/constants/addresses';
import type { CheckoutAddresses } from '@core/types/checkout';

import type { FormButtonsCheckout } from '@lib/types/forms';
import { useAuthContext } from '@lib/contexts/AuthContext';
import useForms from '@lib/hooks/useForms';
import useUser from '@lib/hooks/useUser';
import BaseForm from '@components/forms/BaseForm';

type CheckoutAddressesFormProps = {
  next?: () => void,
};

const CheckoutAddressesForm = (props: CheckoutAddressesFormProps) => {
  const { next } = props;

  const { user } = useAuthContext();

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
      setHiddenBilling(event.target.checked)
    }
  };

  const handleSubmit = async (values: CheckoutAddresses, formikHelpers: FormikHelpers<CheckoutAddresses>, dirty: boolean) => {
    if (dirty || !user?.shipping || !user?.billing) {
      if (!user) {
        return;
      }
      const checkoutAddresses = {...values};
      if (values.sameAsShipping) {
        checkoutAddresses.billing = {...values.shipping};
        formikHelpers.setFieldValue('billing.firstName', values.shipping.firstName);
        formikHelpers.setFieldValue('billing.lastName', values.shipping.lastName);
        formikHelpers.setFieldValue('billing.addressLine1', values.shipping.addressLine1);
        formikHelpers.setFieldValue('billing.addressLine2', values.shipping.addressLine2);
        formikHelpers.setFieldValue('billing.postalCode', values.shipping.postalCode);
        formikHelpers.setFieldValue('billing.locality', values.shipping.locality);
        formikHelpers.setFieldValue('billing.country', values.shipping.country);
      }
      updateUserAddresses(user, checkoutAddresses, next);
    } else if (!dirty && user?.shipping && user?.billing) {
      if (next) {
        next();
      };
    }
  };

  return (
    <BaseForm
      maxWidth="800px"
      initialValues={{
        shipping: {
          id: user?.shipping?.id || -1,
          userId: user?.shipping?.userId || user?.id || -1,
          type: user?.shipping?.type || AddressTypes.SHIPPING,
          firstName: user?.shipping?.firstName || user?.firstName || addressFieldsInitValues.firstName,
          lastName: user?.shipping?.lastName || user?.lastName || addressFieldsInitValues.lastName,
          addressLine1: user?.shipping?.addressLine1 || addressFieldsInitValues.addressLine1,
          addressLine2: user?.shipping?.addressLine2 || addressFieldsInitValues.addressLine2,
          postalCode: user?.shipping?.postalCode || addressFieldsInitValues.postalCode,
          locality: user?.shipping?.locality || addressFieldsInitValues.locality,
          country: user?.shipping?.country || addressFieldsInitValues.country,
        },
        billing: {
          id: user?.billing?.id || -1,
          userId: user?.billing?.userId || user?.id || -1,
          type: user?.billing?.type || AddressTypes.BILLING,
          firstName: user?.billing?.firstName || user?.firstName || addressFieldsInitValues.firstName,
          lastName: user?.billing?.lastName || user?.lastName || addressFieldsInitValues.lastName,
          addressLine1: user?.billing?.addressLine1 || addressFieldsInitValues.addressLine1,
          addressLine2: user?.billing?.addressLine2 || addressFieldsInitValues.addressLine2,
          postalCode: user?.billing?.postalCode || addressFieldsInitValues.postalCode,
          locality: user?.billing?.locality || addressFieldsInitValues.locality,
          country: user?.billing?.country || addressFieldsInitValues.country,
        },
        sameAsShipping: false,
      } as CheckoutAddresses}
      validationSchema={checkoutAddressesFormValidation}
      enableReinitialize={true}
      onChange={handleChange}
      formFieldGroups={[
        {
          titleTxt: {
            id: 'forms.shipping',
            textAlign: 'center',
          },
          formFields: addressFormFields(AddressTypes.SHIPPING),
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
              ...addressFormFields(AddressTypes.BILLING)
            ] : 
            [
              {
                name: 'sameAsShipping',
                type: FormFieldTypes.checkbox,
              },
            ],
        }
      ]}
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
