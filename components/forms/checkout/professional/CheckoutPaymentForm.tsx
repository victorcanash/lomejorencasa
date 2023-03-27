import { MutableRefObject } from 'react';

import { FormikProps } from 'formik';

import type { CheckoutContact } from '@core/types/checkout';

import { useAuthContext } from '@lib/contexts/AuthContext';
import CheckoutPaypalForm from '@components/forms/checkout/professional/CheckoutPaypalForm';

type CheckoutPaymentFormProps = {
  contactFormRef: MutableRefObject<FormikProps<CheckoutContact> | null>,
};

const CheckoutPaymentForm = (props: CheckoutPaymentFormProps) => {
  const { contactFormRef } = props;

  const { braintreeToken, paypal } = useAuthContext();

  return (
    <>
      { (!braintreeToken && paypal) &&
        <CheckoutPaypalForm
          contactFormRef={contactFormRef}
        />
      }
    </>
  );
};

export default CheckoutPaymentForm;
