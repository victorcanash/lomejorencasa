import { useState, useRef, Dispatch, useEffect, useCallback, SetStateAction, ChangeEvent } from 'react';

import { useIntl } from 'react-intl';
import { 
  CreateOrderData, 
  CreateOrderActions, 
  OnApproveData, 
  OnApproveActions, 
  HostedFieldsHandler 
} from '@paypal/paypal-js';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { getBackendErrorMsg, logBackendError } from '@core/utils/errors';

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
  const { checkoutPayment, setCheckoutPayment, isLogged } = useAuthContext();

  const intl = useIntl();
  const [{ isResolved, options }, dispatch] = usePayPalScriptReducer();

  const { getPaypalUserToken, createPaypalTransaction, errorMsg, successMsg, setSuccessMsg } = usePayments();

  const [loadedPaypal, setLoadedPaypal] = useState(false);
  const [renderInstance, setRenderInstance] = useState<HostedFieldsHandler | undefined>(undefined);
  const [supportsHostedFields, setSupportsHostedFields] = useState<boolean | undefined>(undefined);

  const paypal = window.paypal;

  const handlePaypalButtonsSubmit = async (_data: CreateOrderData, _actions: CreateOrderActions) => {
    setTransactionError('');
    return createPaypalTransaction();
  };

  const onPaypalButtonsApprove = async (data: OnApproveData, _actions: OnApproveActions) => {
    onSuccessPaypalTransaction(data.orderID);
  };

  const onPaypalButtonsError = (error: Record<string, unknown>) => {
    onErrorPaypalTransaction(error);
  };

  const handlePaypalHostedFieldsSubmit = async () => {
    if (renderInstance) {
      setTransactionError('');
      renderInstance
        .submit()
        .then((response) => { 
          onSuccessPaypalTransaction(response.orderId);
        })
        .catch((error: Record<string, unknown>) => {
          onErrorPaypalTransaction(error);
        });
    }
  };

  const onSuccessPaypalTransaction = (orderId: string) => {
    setCheckoutPayment({
      paypalPayload: {
        orderId: orderId,
        cardName: undefined,
      },
      remember,
    });
    setTimeout(() => {
      setLoading(false);
      next(); 
    }, 10);
  };

  const onErrorPaypalTransaction = (error: Record<string, unknown>) => {
    const errorMsg = getBackendErrorMsg('SDK Paypal ERROR', error);
    logBackendError(errorMsg);
    setSuccessMsg('');
    setTransactionError(intl.formatMessage({ id: 'checkout.errors.checkPaymentMethod' }));
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
        /*styles: {
          input: {
            "font-size": "16pt",
            color: "#3A3A3A"
          },
          ".number": {
            "font-family": "monospace"
          },
          ".valid": {
            color: "green"
          }
        },*/
        fields: {
          number: {
            selector: "#card-number",
            placeholder: "Credit Card Number"
          },
          cvv: {
            selector: "#cvv",
            placeholder: "CVV"
          },
          expirationDate: {
            selector: "#expiration-date",
            placeholder: "MM/YYYY"
          }
        }
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
                sx={{           
                  mt: '10px',   
                }}
              >
                <PayPalButtons
                  disabled={!renderInstance || !checkoutPayment}
                  forceReRender={[totalPrice]}
                  fundingSource={undefined}
                  createOrder={handlePaypalButtonsSubmit}
                  onApprove={onPaypalButtonsApprove}
                  onError={onPaypalButtonsError}
                />
                <Box>
                  <label htmlFor="card-number">Card Number</label>
                  <Box id="card-number"></Box>
                  <label htmlFor="expiration-date">Expiration Date</label>
                  <Box id="expiration-date"></Box>
                  <label htmlFor="cvv">CVV</label>
                  <Box id="cvv"></Box>
                  {/*<button onClick={handlePaypalHostedFieldsSubmit}>
                    Pay with Card
                  </button>*/}
                </Box>
              </Box>
              {/* Remember Field */}
              { isLogged() &&
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
              }
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
          disabled: !renderInstance || !checkoutPayment,
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
