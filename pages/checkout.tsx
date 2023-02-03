import { useState } from 'react';
import type { NextPage } from 'next';

import { useIntl } from 'react-intl';

import Container from '@mui/material/Container';

import { PageTypes } from '@core/constants/navigation';
import { CheckoutSections } from '@core/constants/checkout';

import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import Stepper from '@components/ui/Stepper';
import CheckoutAddressesSection from '@components/checkout/sections/CheckoutAddressesSection';
import CheckoutPaymentSection from '@components/checkout/sections/CheckoutPaymentSection';
import CheckoutConfirmSection from '@components/checkout/sections/CheckoutConfirmSection';

const Checkout: NextPage = () => {
  const page = usePage();
  const intl = useIntl();

  const [activeStep, setActiveStep] = useState(0);
  const [transactionError, setTransactionError] = useState('');

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
          />
        }
      </Container>
    </>
  );
};

export default Checkout;
