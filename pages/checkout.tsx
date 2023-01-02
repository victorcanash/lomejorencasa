import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { useIntl } from 'react-intl';

import { CheckoutSections } from '@core/constants/checkout';
import usePage from '@lib/hooks/usePage';
import Stepper from '@components/ui/Stepper';
import CheckoutAddressesSection from '@components/checkout/sections/CheckoutAddressesSection';
import CheckoutPaymentSection from '@components/checkout/sections/CheckoutPaymentSection';
import CheckoutConfirmationSection from '@components/checkout/sections/CheckoutConfirmationSection';

const Checkout: NextPage = () => {
  const intl = useIntl();

  const page = usePage();

  const title = intl.formatMessage({ id: 'checkout.metas.title' });
  const description = intl.formatMessage({ id: 'checkout.metas.description' });

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
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <Stepper 
        activeStep={activeStep}
        steps={Object.values(CheckoutSections).map((section) => {
          return intl.formatMessage({ id: `checkout.sections.${section}` });
        })}
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
      { currentCheckoutSection() == CheckoutSections.confirmation &&
        <CheckoutConfirmationSection
          back={prevStep}
          setTransactionError={setTransactionError}
        />
      }
    </>
  );
};

export default Checkout;
