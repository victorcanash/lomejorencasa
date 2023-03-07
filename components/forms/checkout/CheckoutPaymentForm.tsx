import { useState, Dispatch, SetStateAction, ChangeEvent } from 'react';

import { useIntl } from 'react-intl';
import { Dropin, PaymentMethodPayload } from 'braintree-web-drop-in';
import DropIn from 'braintree-web-drop-in-react';
import { OnApproveData, OnApproveActions, CreateOrderData, CreateOrderActions } from '@paypal/paypal-js';
import { PayPalButtons } from "@paypal/react-paypal-js";

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { getBackendErrorMsg, logBackendError } from '@core/utils/errors';

import type { FormButtonsCheckout, FormButtonsNormal } from '@lib/types/forms';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { useCartContext } from '@lib/contexts/CartContext';
import usePayments from '@lib/hooks/usePayments';
import BaseForm from '@components/forms/BaseForm';

type CheckoutPaymentFormProps = {
  next?: () => void,
  back?: () => void,
  transactionError?: string,
  setTransactionError?: Dispatch<SetStateAction<string>>,
  confirmToken: string,
};

const CheckoutPaymentForm = (props: CheckoutPaymentFormProps) => {
  const { next, back, transactionError, setTransactionError, confirmToken } = props;

  const { braintreeToken, paypalMerchantId, paypalClientId, setCheckoutPayment, isLogged } = useAuthContext();
  const { totalPrice } = useCartContext();

  const intl = useIntl();

  const { checkBraintreePaymentMethod, createPaypalTransaction, errorMsg, successMsg } = usePayments();

  // Braintree fields
  const [braintreeDropin, setBraintreeDropin] = useState<Dropin | undefined>(undefined)
  const [rememberFieldValue, setRememberFieldValue] = useState(true)

  const handleRememberField = (_event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setRememberFieldValue(checked);
  };

  const handleBack = async () => {
    if (setTransactionError) {
      setTransactionError('');
    }
    if (back) {
      back();
    }
  };

  const handleBraintreeSubmit = async () => {
    if (!braintreeDropin) {
      return;
    }
    if (setTransactionError) {
      setTransactionError('');
    }
    checkBraintreePaymentMethod(braintreeDropin, onSuccessCheckBPaymentMethod);
  };

  const onSuccessCheckBPaymentMethod = (paymentPayload: PaymentMethodPayload) => {
    setCheckoutPayment({
      braintreePayload: paymentPayload,
      remember: rememberFieldValue,
    });
    setTimeout(() => { 
      if (next) {
        next(); 
      }
    }, 10);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePaypalSubmit = async (_data: CreateOrderData, _actions: CreateOrderActions) => {
    if (setTransactionError) {
      setTransactionError('');
    }
    let paypalOrderId = '';
    await createPaypalTransaction(isLogged() ? undefined : confirmToken)
      .then((response: string) => {
        paypalOrderId = response;
      }).catch((errorMsg) => {
        onErrorPaypalTransaction(errorMsg)
      })
    return paypalOrderId
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPaypalApprove = async (data: OnApproveData, _actions: OnApproveActions) => {
    onSuccessPaypalTransaction(data.orderID);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPaypalError = (error: Record<string, unknown>) => {
    const errorMsg = getBackendErrorMsg('SDK Paypal ERROR', error);
    logBackendError(errorMsg)
    onErrorPaypalTransaction()
  };

  const onSuccessPaypalTransaction = (orderId: string) => {
    setCheckoutPayment({
      paypalPayload: {
        orderId: orderId
      },
    });
    setTimeout(() => {
      if (next) {
        next(); 
      }
    }, 10);
  };

  const onErrorPaypalTransaction = (message?: string) => {
    if (setTransactionError) {
      setTransactionError(message || intl.formatMessage({ id: 'checkout.errors.createTransaction' }));
    }
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
          extraElements: (!paypalMerchantId || !paypalClientId) ?
            <>
              { braintreeToken &&
                <>
                  {/* Dropin field */}
                  <div 
                    id="dropinPayment"
                    style={{           
                      padding: '13px 5px 0px 5px',
                      marginTop: '10px',
                      marginBottom: !isLogged() ? '25px' : undefined,
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
                        setBraintreeDropin(instance);
                      }}
                    />
                  </div>
                  {/* Remember Field */}
                  { isLogged() &&
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
                  }
                </>
              }
            </> 
            :
            <div 
              style={{           
                marginTop: '10px',   
              }}
            >
              <PayPalButtons
                disabled={false}
                forceReRender={[totalPrice]}
                fundingSource={undefined}
                createOrder={handlePaypalSubmit}
                onApprove={onPaypalApprove}
                onError={onPaypalError}
              />
            </div>
          ,
        }
      ]}
      formButtons={(!paypalMerchantId || !paypalClientId) ? {
          submit: {
            text: { 
              id: 'app.continueBtn',
            },
            onSubmit: handleBraintreeSubmit,
            disabled: !braintreeDropin,
          },
          back: {
            text: { 
              id: 'app.backBtn',
            },
            onClick: handleBack,
          },
        } as FormButtonsCheckout
        :
        {
          submit: {
            text: {
              id: 'app.backBtn',
            },
            onSubmit: handleBack,
          },
        } as FormButtonsNormal
      }
      successMsg={successMsg}
      errorMsg={errorMsg ? errorMsg : transactionError}
    />
  );
};

export default CheckoutPaymentForm;
