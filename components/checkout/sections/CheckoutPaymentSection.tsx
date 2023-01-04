import { useState, Dispatch, SetStateAction, ChangeEvent } from 'react';

import { useIntl, FormattedMessage } from 'react-intl';
import { Dropin, PaymentMethodPayload } from 'braintree-web-drop-in';
import DropIn from 'braintree-web-drop-in-react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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

  const { braintreeToken, setCheckoutPayment } = useAuthContext();

  const intl = useIntl();

  const { checkPaymentMethod, errorMsg, successMsg } = usePayments();

  const [dropinInstance, setDropinInstance] = useState<Dropin | undefined>(undefined)
  const [rememberFieldValue, setRememberFieldValue] = useState(true)

  const handleRememberField = (_event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setRememberFieldValue(checked);
  };

  const handleContinue = () => {
    if (!dropinInstance) {
      return;
    }
    setTransactionError('');
    checkPaymentMethod(dropinInstance, onSuccessCheckPaymentMethod);
  };

  const onSuccessCheckPaymentMethod = (paymentPayload: PaymentMethodPayload) => {
    setCheckoutPayment({
      methodPayload: paymentPayload,
      remember: rememberFieldValue,
    });
    setTimeout(() => { 
      next(); 
    }, 10);
  };

  const handleBack = () => {
    setTransactionError('');
    back();
  };

  return (
    <Container maxWidth="md">

      <Grid container spacing={5} mt={1}>
        <Grid item xs={12}>
          <Typography component="h3" variant="h1">
            <FormattedMessage
              id="checkout.paymentMethod"
            />
          </Typography>
          { braintreeToken &&
            <>

              {/* Dropin field */}
              <div 
                id="dropinPayment"
                style={{           
                  padding: '13px 5px 0px 5px',
                  marginTop: '10px',
                }}
              >
                <DropIn
                  options={{ 
                    authorization: braintreeToken,
                    locale: intl.locale,
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

              {/* Remember Field */}
              <FormControlLabel
                label={intl.formatMessage({ id: "forms.rememberPayment" })}
                control={
                  <Checkbox 
                    id="remember"
                    name="remember"
                    checked={rememberFieldValue} 
                    onChange={handleRememberField}
                  />
                }
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
            sx={{ mb: 2 }}
            onClick={handleBack}
          >
            <FormattedMessage 
              id="app.backBtn" 
            />
          </Button> 
        </Grid> 

        <Grid item xs={6}>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mb: 2 }}
            onClick={handleContinue}
            disabled={!dropinInstance}
          >
            <FormattedMessage 
              id="app.continueBtn" 
            />
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