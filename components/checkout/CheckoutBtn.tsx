import React from 'react';

import { useStripe } from '@stripe/react-stripe-js';
import { useSnackbar } from 'notistack';

import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import Button from '@mui/material/Button';

import { createCheckoutSession } from '@core/utils/stripe';
import { useAuthContext } from '@lib/contexts/AuthContext';

const CheckoutBtn = () => {
  const { token } = useAuthContext();

  const stripe = useStripe();
  const { enqueueSnackbar } = useSnackbar();

  const handleOnClick = () => {
    if (!stripe) {
      errorSnackbar();
    }
    createCheckoutSession(token).then(async (response: { sessionId: string }) => {
      stripe?.redirectToCheckout({
        sessionId: response.sessionId
      }).then(() => {
        
      }).catch((error) => {
        errorSnackbar();
      })
    }).catch((error) => {
        errorSnackbar();
    });
  };

  const errorSnackbar = () => {
    enqueueSnackbar('Failed proceeding to payment, try it again', { variant: 'error' });
  }

  return (
    <Button
      onClick={handleOnClick}
      startIcon={<PointOfSaleIcon />}
    >
      Proceed to payment
    </Button>
  );
};

export default CheckoutBtn;
