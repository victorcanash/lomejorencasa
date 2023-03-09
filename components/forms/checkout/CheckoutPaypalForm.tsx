import { useState, Dispatch, useEffect, useCallback, SetStateAction, ChangeEvent } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';
import { 
  CreateOrderData, 
  CreateOrderActions, 
  OnApproveData, 
  OnApproveActions, 
  HostedFieldsHandler 
} from '@paypal/paypal-js';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import type { FormatText } from '@core/types/texts';
import { getBackendErrorMsg, logBackendError } from '@core/utils/errors';
import { getCountryCode } from '@core/utils/addresses';

import colors from '@lib/constants/themes/colors';
import typographies from '@lib/constants/themes/typographies';
import { themeDefaultElements } from '@lib/constants/themes/elements';
import type { FormButtonsCheckout } from '@lib/types/forms';
import { useAppContext } from '@lib/contexts/AppContext';
import { useCartContext } from '@lib/contexts/CartContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import usePayments from '@lib/hooks/usePayments';
import BaseForm from '@components/forms/BaseForm';

type CheckoutPaypalFormProps = {
  next: () => void,
  handleBack: () => Promise<void>,
  transactionError: string | undefined,
  setTransactionError: Dispatch<SetStateAction<string>>,
  remember: boolean,
  handleRemember: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void,
};

const CheckoutPaypalForm = (props: CheckoutPaypalFormProps) => {
  const { 
    next, 
    handleBack, 
    transactionError, 
    setTransactionError,
    remember,
    handleRemember,
  } = props;

  const { setLoading } = useAppContext();
  const { totalPrice } = useCartContext();
  const { user, checkoutPayment, setCheckoutPayment, isLogged } = useAuthContext();

  const intl = useIntl();
  const [{ isResolved, options }, dispatch] = usePayPalScriptReducer();

  const { getPaypalUserToken, createPaypalTransaction, errorMsg, successMsg, setSuccessMsg } = usePayments();

  const [loadedPaypal, setLoadedPaypal] = useState(false);
  const [renderInstance, setRenderInstance] = useState<HostedFieldsHandler | undefined>(undefined);
  const [supportsHostedFields, setSupportsHostedFields] = useState<boolean | undefined>(undefined);
  const [cardHolderNameFieldValue, setCardHolderNameFieldValue] = useState(checkoutPayment.paypalPayload?.card?.holderName || '');

  const paypal = window.paypal;

  const handlePaypalButtonsSubmit = async (_data: CreateOrderData, _actions: CreateOrderActions) => {
    setTransactionError('');
    return createPaypalTransaction();
  };

  const onPaypalButtonsApprove = async (data: OnApproveData, _actions: OnApproveActions) => {
    setCheckoutPayment({
      paypalPayload: {
        orderId: data.orderID,
        /*paypal: {
          email: '',
        },*/
      },
      remember,
    })
    onSuccessPaypalTransaction
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPaypalButtonsError = (error: any) => {
    onErrorPaypalTransaction(error);
  };

  const handlePaypalHostedFieldsSubmit = async () => {
    if (renderInstance) {
      setTransactionError('');
      renderInstance
        .submit({
          cardholderName: cardHolderNameFieldValue,
          billingAddress: {
            streetAddress: user.billing?.addressLine1,
            extendedAddress: user.billing?.addressLine2,
            region: user.billing?.country,
            locality: user.billing?.locality,
            postalCode: user.billing?.postalCode,
            countryCodeAlpha2: user.billing?.country ? getCountryCode(user.billing?.country) : undefined,
          },
          //contingencies: ['SCA_WHEN_REQUIRED'],
        })
        .then((response) => {
          if (!cardHolderNameFieldValue || cardHolderNameFieldValue.length < 3) {
            throw new Error('cardHolderName');
          }
          /*if (response.liabilityShift !== 'POSSIBLE') {
            throw new Error('3dSecure');
          }*/
          setCheckoutPayment({
            ...checkoutPayment,
            paypalPayload: {
              orderId: response.orderId,
              card: {
                type: response.card.brand,
                lastFour: response.card.last_digits,
                holderName: cardHolderNameFieldValue,
              },
            },
            remember,
          });
          onSuccessPaypalTransaction();
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((error: any) => {
          onErrorPaypalTransaction(error);
        });
    }
  };

  const onSuccessPaypalTransaction = () => {
    setSuccessMsg(intl.formatMessage({ id: 'checkout.successes.checkPaymentMethod' }));
    setTimeout(() => {
      setLoading(false);
      next(); 
    }, 10);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onErrorPaypalTransaction = (error: any) => {
    setLoading(false);
    const errorMsg = getBackendErrorMsg('SDK Paypal ERROR', error);
    logBackendError(errorMsg);
    setSuccessMsg('');
    let errorDetail = '';
    if (error.details && error.details.length > 0 && error.details[0].field) {
      errorDetail = error.details[0].field as string;
    }
    if (error.message && error.message.includes('3dSecure')) {
      setTransactionError(intl.formatMessage({ id: 'checkout.errors.checkPaymentMethodCardFields3dSecure' }));
    } else if (error.message && error.message.includes('cardHolderName')) {
      setTransactionError(intl.formatMessage({ id: 'checkout.errors.checkPaymentMethodCardFieldsHolderName' }));
    } else if (errorDetail && errorDetail.includes('card/number')) {
      setTransactionError(intl.formatMessage({ id: 'checkout.errors.checkPaymentMethodCardFieldsNumber' }));
    } else if (errorDetail && errorDetail.includes('card/cvv')) {
      setTransactionError(intl.formatMessage({ id: 'checkout.errors.checkPaymentMethodCardFieldsCVV' }));
    } else if (errorDetail && errorDetail.includes('card/expiry')) {
      setTransactionError(intl.formatMessage({ id: 'checkout.errors.checkPaymentMethodCardFieldsExpiry' }));
    } else {
      setTransactionError(intl.formatMessage({ id: 'checkout.errors.checkPaymentMethod' }));
    }
  };

  const initPaypal = useCallback(async () => {
    if (typeof supportsHostedFields === 'boolean' && !!supportsHostedFields) {
      setLoadedPaypal(true);
      await getPaypalUserToken().then((paypalUserToken?: string) => { 
        if (paypalUserToken) {
          dispatch({
            type: 'resetOptions',
            value: {
                ...options,
                'data-user-id-token': paypalUserToken,
            },
          });
        }
      });  
      const instance = await paypal.HostedFields?.render({
        createOrder: createPaypalTransaction,
        styles: {
          'input': {
            'transition': 'color 160ms linear',
            '-webkit-transition': 'color 160ms linear',
            'font-size-adjustfont-size': typographies.content.fontSize,
            'font-weight': typographies.content.fontWeight,
            'line-height': typographies.content.lineHeight,
            'text-align': typographies.default.textAlign,
            'letter-spacing': typographies.default.letterSpacing,
            'font-family': themeDefaultElements.default.typography.fontFamily.join(','),
            'color': colors.text.black,
            'padding': '16.5px 14px',
          },
          ':hover': {
            'color': colors.text.black,
          },
          ':focus': {
            'color': colors.text.black,
          },
          '.invalid': {         
            'color': colors.text.action,
          }
        },
        fields: {
          number: {
            selector: '#cardNumber',
            placeholder: '1111 1111 1111 1111',
          },
          cvv: {
            selector: '#cvv',
            placeholder: '111',
          },
          expirationDate: {
            selector: '#cardExpiry',
            placeholder: 'MM/YY',
          },
        },
      });
      setRenderInstance(instance);
    }
  }, [supportsHostedFields, getPaypalUserToken, paypal.HostedFields, createPaypalTransaction, dispatch, options]);

  useEffect(() => {
    if (isResolved) {
      setSupportsHostedFields(paypal.HostedFields?.isEligible());
    }
  }, [setSupportsHostedFields, options, isResolved, paypal.HostedFields]);

  useEffect(() => {
    if (!loadedPaypal) {
      initPaypal();
    }
  }, [initPaypal, loadedPaypal]);

  const handleCardHolderNameField = (event: ChangeEvent<HTMLInputElement>) => {
    setCardHolderNameFieldValue(event.target.value);
  };

  const disabledSubmitBtn = () => {
    if (!renderInstance || !checkoutPayment) {
      return true;
    }
    return false;
  };
  
  const hostedFieldSx = {
    height: '56px',
    backgroundColor: colors.background.input,
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: colors.background.inputHover,
      border: `1px solid ${colors.text.black}`,
    },
    '&.Mui-focused': {
      backgroundColor: colors.background.inputHover,
      border: `0px solid ${colors.text.black}`,
    },
  };

  const hostedFieldLabel = (formatText: FormatText) => {
    return (
      <Typography variant="body1">
        <FormattedMessage id={`forms.${formatText.id}`} values={formatText.values} />
      </Typography>
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
          extraElements:
            <>
              <Box
                textAlign="center"
                mt={2}
              >
                <PayPalButtons
                  disabled={disabledSubmitBtn()}
                  forceReRender={[totalPrice]}
                  fundingSource={undefined}
                  createOrder={handlePaypalButtonsSubmit}
                  onApprove={onPaypalButtonsApprove}
                  onError={onPaypalButtonsError}
                  style={{ shape: 'pill' }}
                />
              </Box>  
              <Divider 
                sx={{ 
                  my: 2, 
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
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  { hostedFieldLabel({ id: 'cardNumber' }) }
                  <Box id="cardNumber" sx={hostedFieldSx}></Box>
                </Grid>
                <Grid item xs={6}>
                  { hostedFieldLabel({ id: 'cardExpiry' }) }
                  <Box id="cardExpiry" sx={hostedFieldSx}></Box>
                </Grid>
                <Grid item xs={6}>
                  { hostedFieldLabel({ id: 'cvv' }) }
                  <Box id="cvv" sx={hostedFieldSx}></Box>
                </Grid>
                { isLogged() &&
                  <Grid item xs={12}>
                    <FormControlLabel
                      label={intl.formatMessage({ id: 'forms.rememberPayment' })}
                      control={
                        <Checkbox 
                          id="remember"
                          name="remember"
                          checked={remember} 
                          onChange={handleRemember}
                        />
                      }      
                    />
                  </Grid>
                }
              </Grid>     
            </>
          ,
        }
      ]}
      formButtons={{
        submit: {
          text: { 
            id: 'app.continueBtn',
          },
          onSubmit: handlePaypalHostedFieldsSubmit,
          disabled: disabledSubmitBtn(),
        },
        back: {
          text: { 
            id: 'app.backBtn',
          },
          onClick: handleBack,
        },
      } as FormButtonsCheckout}
      successMsg={successMsg}
      errorMsg={errorMsg ? errorMsg : transactionError}
    />
  );
};

export default CheckoutPaypalForm;
