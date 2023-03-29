import Container from '@mui/material/Container';

import { useAuthContext } from '@lib/contexts/AuthContext';
import usePayments from '@lib/hooks/usePayments';
import CheckoutAuthForm from '@components/forms/checkout/CheckoutAuthForm';
import CheckoutCouponForm from '@components/forms/checkout/CheckoutCouponForm';
import CheckoutContactForm from '@components/forms/checkout/CheckoutContactForm';
import CheckoutPaymentForm from '@components/forms/checkout/CheckoutPaymentForm';

const CheckoutForms = () => {
  const { isLogged } = useAuthContext();

  const {
    contactFormRef,
    paypalButtonsDependencies,
    onPaypalButtonsSubmit,
    onPaypalButtonsApprove,
    onPaypalButtonsError,
    onAdvancedCardsSubmit,
    advancedCardsInstance,
    cardHolderNameFieldValue,
    handleCardHolderNameField,
    rememberFieldValue,
    handleRememberField,
    errorMsg,
    successMsg,
  } = usePayments();

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
        paypalButtonsDependencies={paypalButtonsDependencies}
        onPaypalButtonsSubmit={onPaypalButtonsSubmit}
        onPaypalButtonsApprove={onPaypalButtonsApprove}
        onPaypalButtonsError={onPaypalButtonsError}
        onAdvancedCardsSubmit={onAdvancedCardsSubmit}
        advancedCardsInstance={advancedCardsInstance}
        cardHolderNameFieldValue={cardHolderNameFieldValue}
        handleCardHolderNameField={handleCardHolderNameField}
        rememberFieldValue={rememberFieldValue}
        handleRememberField={handleRememberField}
        errorMsg={errorMsg}
        successMsg={successMsg}
      />
    </Container>
  );
};

export default CheckoutForms;
