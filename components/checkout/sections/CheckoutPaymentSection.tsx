import { useState, Dispatch, SetStateAction } from 'react';

import { Dropin, PaymentMethodPayload } from 'braintree-web-drop-in';
import DropIn from 'braintree-web-drop-in-react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

import { useAuthContext } from '@lib/contexts/AuthContext';
import usePayments from '@lib/hooks/usePayments';

type CheckoutPaymentSectionProps = {
  next: () => void,
  back: () => void,
  transactionError: string,
  setTransactionError: Dispatch<SetStateAction<string>>,
};

const CheckoutPaymentSection = (props: CheckoutPaymentSectionProps) => {
  const { next, back, transactionError, setTransactionError } = props;

  const { braintreeToken, setPaymentPayload } = useAuthContext();

  const { checkPaymentMethod, errorMsg, successMsg } = usePayments();

  const [dropinInstance, setDropinInstance] = useState<Dropin | undefined>(undefined)

  const handleContinue = () => {
    if (!dropinInstance) {
      return;
    }
    setTransactionError('');
    checkPaymentMethod(dropinInstance, onSuccessCheckPaymentMethod);
  };

  const onSuccessCheckPaymentMethod = (paymentPayload: PaymentMethodPayload) => {
    setPaymentPayload(paymentPayload);
    setTimeout(() => { 
      next(); 
    }, 10);
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
            <div 
              style={{ 
                backgroundColor: 'white',
                border: '1px solid black',
                borderRadius: '10px',
                padding: '13px 5px 0px 5px',
                marginTop: '10px',
              }}
            >
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
            </div>
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
            onClick={handleContinue}
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