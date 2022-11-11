import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { CheckoutSections } from '@core/constants/checkout';
import usePage from '@lib/hooks/usePage';
import Stepper from '@components/ui/Stepper';
import CheckoutAddressesForm from '@components/forms/checkout/CheckoutAddressesForm';

const Checkout: NextPage = () => {
  const page = usePage();

  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    if (Object.keys(CheckoutSections).length == activeStep + 1) {
      return;
    }
    setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    if (activeStep <= 0) {
      return;
    }
    setActiveStep(activeStep - 1);
  };

  const currentCheckoutSection = () => {
    return Object.values(CheckoutSections)[activeStep];
  };

  return (
    <>
      <Head>
        <title>Checkout</title>
        <meta name="description" content="Checkout page" />
      </Head>

      <Stepper 
        activeStep={activeStep}
        steps={Object.values(CheckoutSections)}
      />

      { currentCheckoutSection() == CheckoutSections.address &&
          <CheckoutAddressesForm 
            next={nextStep}
          />
      }
    </>
  );
};

export default Checkout;
