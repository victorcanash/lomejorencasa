import { MutableRefObject } from 'react';

import { FormikProps } from 'formik';
import { useIntl, FormattedMessage } from 'react-intl';

import { 
  CreateOrderData, 
  CreateOrderActions,
} from '@paypal/paypal-js';
import { PayPalButtons } from '@paypal/react-paypal-js';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

import type { FormatText } from '@core/types/texts';
import type { CheckoutContact } from '@core/types/checkout';

import { paypalHostedFieldsSx } from '@lib/constants/themes/elements';
import type { FormButtonsNormal } from '@lib/types/forms';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { useCartContext } from '@lib/contexts/CartContext';
import usePaypal from '@lib/hooks/usePaypal';
import BaseForm from '@components/forms/BaseForm';

type CheckoutPaypalFormProps = {
  contactFormRef: MutableRefObject<FormikProps<CheckoutContact> | null>,
};

const CheckoutPaypalForm = (props: CheckoutPaypalFormProps) => {
  const { contactFormRef } = props;

  const { paypal, checkoutData: checkoutPayment, isLogged } = useAuthContext();
  const { totalPrice } = useCartContext();

  const intl = useIntl();
  const {
    onPaypalButtonsSubmit,
    onPaypalButtonsApprove,
    onPaypalButtonsError,
    onAdvancedCardsSubmit,
    advancedCardsInstance,
    cardHolderNameFieldValue,
    handleCardHolderNameField,
    rememberFieldValue,
    handleRememberField,
    errorMsg,
    successMsg,
  } = usePaypal();

  const handlePaypalButtonsSubmit = async (data: CreateOrderData, actions: CreateOrderActions) => {
    return onPaypalButtonsSubmit(data, actions, contactFormRef);
  };

  const handleAdvancedCardsSubmit = async () => {
    return onAdvancedCardsSubmit(contactFormRef);
  };

  const hostedFieldLabel = (formatText: FormatText) => {
    return (
      <Typography variant="body1">
        <FormattedMessage id={`forms.${formatText.id}`} values={formatText.values} />
      </Typography>
    );
  };

  const hostedField = (formatText: FormatText) => {
    return (
      <>
        { hostedFieldLabel(formatText) }
        <Box id={formatText.id} sx={paypalHostedFieldsSx} />
      </>
    );
  };

  return (
    <BaseForm
      maxWidth="800px"
      initialValues={{}}
      formFieldGroups={[
        {
          titleTxt: {
            id: 'checkout.paymentMethod',
            textAlign: 'center',
          },
          descriptionTxt: {
            id: 'checkout.paypalDescription',
            textAlign: 'center',
          },
          extraElements:
            <>
              <Box
                textAlign="center"
                mt={2}
              >
                <PayPalButtons
                  disabled={!contactFormRef.current?.isValid}
                  forceReRender={[totalPrice]}
                  fundingSource={undefined}
                  createOrder={handlePaypalButtonsSubmit}
                  onApprove={onPaypalButtonsApprove}
                  onError={onPaypalButtonsError}
                  style={{ shape: 'pill' }}
                />
              </Box>  
              { paypal?.advancedCards &&
                <>
                  <Divider
                    sx={{
                      mb: 2,
                      border: 'none',
                    }}
                  >
                    <Typography variant="body2" textAlign="center">
                      <FormattedMessage id="checkout.paymentMethod.or" />
                    </Typography>
                  </Divider>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      { hostedFieldLabel({ id: 'cardHolderName' }) }
                      <Box id ="cardHolderName">
                        <TextField 
                          fullWidth
                          type="text" 
                          id="cardHolderName" 
                          name="cardHolderName" 
                          autoComplete="off"
                          placeholder=""
                          value={cardHolderNameFieldValue}
                          onChange={handleCardHolderNameField}
                          disabled={!paypal?.advancedCards}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      { hostedField({ id: 'cardNumber' }) }
                    </Grid>
                    <Grid item xs={6}>
                      { hostedField({ id: 'cardExpiry' }) }
                    </Grid>
                    <Grid item xs={6}>
                      { hostedField({ id: 'cvv' }) }
                    </Grid>
                    { isLogged() &&
                      <Grid item xs={12}>
                        <FormControlLabel
                          label={intl.formatMessage({ id: 'forms.rememberPayment' })}
                          control={
                            <Checkbox 
                              id="remember"
                              name="remember"
                              checked={rememberFieldValue} 
                              onChange={handleRememberField}
                            />
                          }      
                        />
                      </Grid>
                    }
                  </Grid>
                </> 
              }
            </>
          ,
        }
      ]}
      formButtons={paypal?.advancedCards ? {
        submit: {
          text: { 
            id: 'app.continueBtn',
          },
          onSubmit: handleAdvancedCardsSubmit,
          disabled: !advancedCardsInstance || !contactFormRef.current?.isValid,
        },
      } as FormButtonsNormal : undefined}
      successMsg={successMsg}
      errorMsg={errorMsg}
    />
  );
};

export default CheckoutPaypalForm;
