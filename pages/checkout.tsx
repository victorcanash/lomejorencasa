import { useState, useCallback, useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useIntl } from 'react-intl';

import Container from '@mui/material/Container';

import { PageTypes } from '@core/constants/navigation';
import { CheckoutSections } from '@core/constants/checkout';

import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import usePage from '@lib/hooks/usePage';
import usePayments from '@lib/hooks/usePayments';
import PageHeader from '@components/ui/PageHeader';
import Stepper from '@components/ui/Stepper';
import CheckoutAddressesForm from '@components/forms/checkout/CheckoutAddressesForm';
import CheckoutPaymentForm from '@components/forms/checkout/CheckoutPaymentForm';
import CheckoutConfirmForm from '@components/forms/checkout/CheckoutConfirmForm';
import LoginInfoDialog from '@components/dialogs/LoginInfoDialog';

const Checkout: NextPage = () => {
  const { setLoading } = useAppContext();
  const { isLogged } = useAuthContext();

  const router = useRouter();

  const page = usePage(false);
  const intl = useIntl();

  const { getGuestUserData } = usePayments();

  const [loadedCheckout, setLoadedCheckout] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [transactionError, setTransactionError] = useState('');
  const [confirmToken, setConfirmToken] = useState<string | undefined>(undefined)
  const [openLoginInfoDialog, setOpenLoginInfoDialog] = useState(false);

  const handleLoginInfoDialog = () => {
    setOpenLoginInfoDialog(!openLoginInfoDialog);
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

  const checkConfirmToken = useCallback(async () => {
    const queryToken = typeof router.query.token == 'string' ? router.query.token : '';
    if (queryToken) {
      await getGuestUserData(queryToken, () => {
        // On success
        setActiveStep(Object.keys(CheckoutSections).length - 1);
        setConfirmToken(queryToken);
        setLoading(false);
      }, () => {
        // On error
        setConfirmToken('');
        setLoading(false);
      });
    } else {
      setConfirmToken(queryToken);
      if (!isLogged()) {
        setOpenLoginInfoDialog(true);
      }
      setLoading(false);
    }
  }, [getGuestUserData, isLogged, router.query.token, setLoading]);

  useEffect(() => {
    if (page.checked && !loadedCheckout) {
      setLoadedCheckout(true);
      checkConfirmToken();
    }
  }, [checkConfirmToken, loadedCheckout, page.checked]);

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'checkout.metas.title',
          descriptionId: 'checkout.metas.description',
        }}
        marginTop={true}
      />

      { confirmToken !== undefined &&
        <Container>
          <Stepper 
            activeStep={activeStep}
            steps={Object.values(CheckoutSections).map((section) => {
              return intl.formatMessage({ id: `checkout.sections.${section}` });
            })}
            mb={4}
          />
          { currentCheckoutSection() == CheckoutSections.address &&
            <CheckoutAddressesForm 
              next={nextStep}
            />
          }
          { currentCheckoutSection() == CheckoutSections.payment &&
            <CheckoutPaymentForm 
              next={nextStep}
              back={prevStep}
              transactionError={transactionError}
              setTransactionError={setTransactionError}
            />
          }
          { currentCheckoutSection() == CheckoutSections.confirm &&
            <CheckoutConfirmForm 
              back={prevStep}
              setTransactionError={setTransactionError}
              confirmToken={confirmToken}
            />
          }

          { !isLogged() && confirmToken === '' &&
            <LoginInfoDialog
              open={openLoginInfoDialog}
              handleDialog={handleLoginInfoDialog}
            />
          }
        </Container>
      }
    </>
  );
};

export default Checkout;
