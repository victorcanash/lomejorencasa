import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { useAuthContext } from '@lib/contexts/AuthContext';
import usePayments from '@core/hooks/usePayments';
import CheckoutAuthForm from '@core/components/forms/checkout/CheckoutAuthForm';
import CheckoutCouponForm from '@core/components/forms/checkout/CheckoutCouponForm';
import CheckoutContactForm from '@core/components/forms/checkout/CheckoutContactForm';
import CheckoutOrderForm from '@core/components/forms/checkout/CheckoutOrderForm';
import CheckoutPaymentForm from '@core/components/forms/checkout/CheckoutPaymentForm';

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
        <Box mb={4}>
          <CheckoutAuthForm />
        </Box>
      }
      <Box mb={4}>
        <CheckoutCouponForm />
      </Box>
      <Box mb={3}>
        <CheckoutContactForm
          formikRef={contactFormRef}
        />
      </Box>
      <Box mb={4}>
        <CheckoutOrderForm />
      </Box>
      <Box>
        <CheckoutPaymentForm
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
      </Box>
    </Container>
  );
};

export default CheckoutForms;
