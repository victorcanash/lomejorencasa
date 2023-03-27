import { useState } from 'react';

import { useIntl } from 'react-intl';

import Container from '@mui/material/Container';

import { CheckoutSections } from '@core/constants/checkout';
import type { CartItem } from '@core/types/cart';

import { useAuthContext } from '@lib/contexts/AuthContext';
import Stepper from '@components/ui/Stepper';
import CheckoutAddressesForm from '@components/forms/checkout/old/CheckoutAddressesForm';
import CheckoutPaymentForm from '@components/forms/checkout/old/CheckoutPaymentForm';
import CheckoutConfirmForm from '@components/forms/checkout/old/CheckoutConfirmForm';
import LoginInfoDialog from '@components/dialogs/LoginInfoDialog';
import CheckedCartDialog from '@components/dialogs/CheckedCartDialog';

const CheckoutOld = () => {
  const { isLogged } = useAuthContext();

  const intl = useIntl();

  const [activeStep, setActiveStep] = useState(0);
  const [transactionError, setTransactionError] = useState('');
  const [openLoginInfoDialog, setOpenLoginInfoDialog] = useState(false);
  const [openCartDialog, setOpenCartDialog] = useState(false);
  const [changedCartDialog, setChangedCartDialog] = useState(false);
  const [changedItemsByInventoryDialog, setChangedItemsByInventoryDialog] = useState<CartItem[]>([]);

  const handleLoginInfoDialog = () => {
    setOpenLoginInfoDialog(!openLoginInfoDialog);
  };

  const handleCartDialog = () => {
    setOpenCartDialog(!openCartDialog);
  };

  const nextStep = () => {
    if (Object.keys(CheckoutSections).length == activeStep + 1) {
      return;
    }
    setActiveStep(activeStep + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    if (activeStep <= 0) {
      return;
    }
    setActiveStep(activeStep - 1);
    window.scrollTo(0, 0);
  };

  const currentCheckoutSection = () => {
    return Object.values(CheckoutSections)[activeStep];
  };

  const sections = () => {
    switch (currentCheckoutSection()) {
      case CheckoutSections.address:
        return (
          <CheckoutAddressesForm 
            next={nextStep}
          />
        );
      case CheckoutSections.payment:
        return (
          <CheckoutPaymentForm 
            next={nextStep}
            back={prevStep}
            transactionError={transactionError}
            setTransactionError={setTransactionError}
          />
        );
      case CheckoutSections.confirm:
        return (
          <CheckoutConfirmForm
            back={prevStep}
            setTransactionError={setTransactionError}
            handleCartDialog={handleCartDialog}
            setChangedCartDialog={setChangedCartDialog}
            setChangedItemsByInventoryDialog={setChangedItemsByInventoryDialog}
          />
        );
      default:
        return(
          <></>
        );
    }
  };

  return (
    <Container>
      <Stepper 
        activeStep={activeStep}
        steps={Object.values(CheckoutSections).map((section) => {
          return intl.formatMessage({ id: `checkout.sections.${section}` });
        })}
        mb={4}
      />

      { sections() }

      { !isLogged() &&
        <LoginInfoDialog
          open={openLoginInfoDialog}
          handleDialog={handleLoginInfoDialog}
        />
      }
      <CheckedCartDialog
        open={openCartDialog}
        handleDialog={handleCartDialog}
        changedCart={changedCartDialog}
        changedItemsByInventory={changedItemsByInventoryDialog}
        message={intl.formatMessage({ id: 'dialogs.checkedCart.content.checkoutPage' })}
      />
    </Container>
  );
};

export default CheckoutOld;
