import { useState } from 'react';
import type { NextPage } from 'next';
import Head from "next/head";
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useAuthContext } from '@lib/contexts/AuthContext';
import usePage from '@lib/hooks/usePage';
import useAuth from '@lib/hooks/useAuth';
import AddressForm from '@components/forms/CheckoutAddressForm';

const steps = ['Address', 'Payment', 'Checking'];

const Checkout: NextPage = () => {
  const { user } = useAuthContext();

  const page = usePage();
  const { update } = useAuth();

  const [activeStep, setActiveStep] = useState(0);

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <AddressForm user={user} handleNext={handleNext} />;
      case 1:
        //return <PaymentForm />;
      case 2:
        //return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <Head>
        <title>Checkout</title>
        <meta name="description" content="Checkout page" />
      </Head>

      <Container
        maxWidth='sm'
        className='animate__animated animate__fadeIn'
      >
        {/*<Paper
          sx={{ mt: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          elevation={12}
        >*/}
          <Typography component='h1' variant='h4' align='center'>
            Checkout
          </Typography>

          <Stepper
            activeStep={activeStep}
            sx={{ pt: 3, pb: 5, display: { xs: 'none', sm: 'flex' } }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? ({/*
              <DispatchCheckout
                userData={userData}
                resetUserData={resetUserData}
                cart={cart}
                resetCart={resetCart}
                totalCartPrice={totalCartPrice}
              />
            */}) : (
              <>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant='contained'
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1
                      ? 'Finish'
                      : 'Siguiente'}
                  </Button>
                </Box>
              </>
            )}
          </>
        {/*</Paper>*/}
      </Container>

    </>
  );
};

export default Checkout;
