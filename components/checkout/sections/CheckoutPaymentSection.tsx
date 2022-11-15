import { useState, Dispatch, SetStateAction } from 'react';

import { Dropin, PaymentMethodPayload } from 'braintree-web-drop-in';
import DropIn from 'braintree-web-drop-in-react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

import { useAuthContext } from '@lib/contexts/AuthContext';
import useUser from '@lib/hooks/useUser';

type CheckoutPaymentSectionProps = {
  next: () => void,
  back: () => void,
  setPaymentPayload: Dispatch<SetStateAction<PaymentMethodPayload | undefined>>,
  transactionError: string,
  setTransactionError: Dispatch<SetStateAction<string>>,
};

const CheckoutPaymentSection = (props: CheckoutPaymentSectionProps) => {
  const { next, back, setPaymentPayload, transactionError, setTransactionError } = props;

  const { braintreeToken } = useAuthContext();

  const { checkPaymentMethod, errorMsg, successMsg } = useUser();

  const [dropinInstance, setDropinInstance] = useState<Dropin | undefined>(undefined)

  const handleSubmit = () => {
    if (!dropinInstance) {
      return;
    }
    setTransactionError('');
    checkPaymentMethod(dropinInstance, onSuccessSubmit);
  };

  const onSuccessSubmit = (paymentPayload: PaymentMethodPayload) => {
    setPaymentPayload(paymentPayload);
    setTimeout(() => { 
      next(); 
    }, 1000);
  };

  const handleBack = () => {
    setTransactionError('');
    back();
  }

  return (
    <Container maxWidth="md">

      <Grid container spacing={5} mt={1}>
        <Grid item xs={12}>
          <Typography component="h3" variant="h6">
            Payment method
          </Typography>
          { braintreeToken &&
            <>
              <DropIn
                options={{ 
                  authorization: braintreeToken,
                  locale: 'en',
                  vaultManager: true,
                  card: {
                    cardholderName: {
                      required: true,
                    },
                  },
                  paypal: {
                    flow: 'vault',
                  },
                }}
                onInstance={(instance) => {
                  setDropinInstance(instance);
                }}
              />
            </>
          }
        </Grid>
      </Grid>

      <Grid container spacing={5} mt={1}>
        <Grid item xs={6}>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleBack}
          >
            Back
          </Button> 
        </Grid> 

        <Grid item xs={6}>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
            disabled={!dropinInstance}
          >
            Continue
          </Button> 
        </Grid>  
      </Grid>

      {
        errorMsg && errorMsg !== '' &&
          <Alert severity="error">{ errorMsg }</Alert>
      }
      {
        transactionError && transactionError !== '' &&
          <Alert severity="error">{ transactionError }</Alert>
      }
      {
        successMsg && successMsg !== '' &&
          <Alert>{ successMsg }</Alert>
      }         

    </Container>
  );
};

export default CheckoutPaymentSection;