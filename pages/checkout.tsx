import { useState, useCallback, useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useIntl } from 'react-intl';

import Container from '@mui/material/Container';

import { PageTypes } from '@core/constants/navigation';
import { CheckoutSections } from '@core/constants/checkout';

import { useAppContext } from '@lib/contexts/AppContext';
import usePage from '@lib/hooks/usePage';
import usePayments from '@lib/hooks/usePayments';
import PageHeader from '@components/ui/PageHeader';
import Stepper from '@components/ui/Stepper';
import CheckoutAddressesSection from '@components/checkout/sections/CheckoutAddressesSection';
import CheckoutPaymentSection from '@components/checkout/sections/CheckoutPaymentSection';
import CheckoutConfirmSection from '@components/checkout/sections/CheckoutConfirmSection';

const Checkout: NextPage = () => {
  const { setLoading } = useAppContext();

  const router = useRouter();

  const page = usePage(false);
  const intl = useIntl();

  const { getGuestUserData } = usePayments();

  const [loadedCheckout, setLoadedCheckout] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [transactionError, setTransactionError] = useState('');
  const [confirmToken, setConfirmToken] = useState<string | undefined>(undefined)

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
      setLoading(false);
    }
  }, [getGuestUserData, router.query.token, setLoading]);

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
            <CheckoutAddressesSection 
              next={nextStep}
            />
          }
          { currentCheckoutSection() == CheckoutSections.payment &&
            <CheckoutPaymentSection 
              next={nextStep}
              back={prevStep}
              transactionError={transactionError}
              setTransactionError={setTransactionError}
            />
          }
          { currentCheckoutSection() == CheckoutSections.confirm &&
            <CheckoutConfirmSection
              back={prevStep}
              setTransactionError={setTransactionError}
              confirmToken={confirmToken}
            />
          }
        </Container>
      }
    </>
  );
};

export default Checkout;
