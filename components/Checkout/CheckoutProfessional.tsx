import { useRef } from 'react';

import { FormikProps } from 'formik';

import Container from '@mui/material/Container';

import { useAuthContext } from '@lib/contexts/AuthContext';
import CheckoutAuthForm from '@components/forms/checkout/professional/CheckoutAuthForm';
import CheckoutCouponForm from '@components/forms/checkout/professional/CheckoutCouponForm';
import CheckoutContactForm from '@components/forms/checkout/professional/CheckoutContactForm';
import CheckoutPaymentForm from '@components/forms/checkout/professional/CheckoutPaymentForm';

const CheckoutProfessional = () => {
  const { isLogged } = useAuthContext();
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const contactFormRef = useRef<FormikProps<any> | null>(null);

  return (
    <Container>
      { !isLogged() &&
        <CheckoutAuthForm />
      }
      <CheckoutCouponForm />
      <CheckoutContactForm
        formikRef={contactFormRef}
      />
      <CheckoutPaymentForm
        contactFormRef={contactFormRef}
      />
    </Container>
  );
};

export default CheckoutProfessional;
