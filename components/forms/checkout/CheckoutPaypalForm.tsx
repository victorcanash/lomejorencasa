import { useState, Dispatch, useEffect, useCallback, SetStateAction } from 'react';

import { useIntl } from 'react-intl';
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions, HostedFieldsHandler } from '@paypal/paypal-js';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

import { getBackendErrorMsg, logBackendError } from '@core/utils/errors';

import type { FormButtonsCheckout } from '@lib/types/forms';
import { useCartContext } from '@lib/contexts/CartContext';
import usePayments from '@lib/hooks/usePayments';
import BaseForm from '@components/forms/BaseForm';

type CheckoutPaypalFormProps = {
  next: () => void,
  handleBack: () => Promise<void>,
  transactionError: string | undefined,
  setTransactionError: Dispatch<SetStateAction<string>>,
};

const CheckoutPaypalForm = (props: CheckoutPaypalFormProps) => {
  const { 
    next, 
    handleBack, 
    transactionError, 
    setTransactionError,
  } = props;

  const { totalPrice } = useCartContext();

  const intl = useIntl();
  const [{ isResolved, options }] = usePayPalScriptReducer();

  const { createPaypalTransaction, errorMsg, successMsg } = usePayments();

  const [loadedPaypal, setLoadedPaypal] = useState(false);
  const [renderInstance, setRenderInstance] = useState<HostedFieldsHandler | undefined>(undefined);
  const [supportsHostedFields, setSupportsHostedFields] = useState<boolean | undefined>(undefined);

  const paypal = window.paypal;

  const handlePaypalButtonsSubmit = async (_data: CreateOrderData, _actions: CreateOrderActions) => {
    setTransactionError('');
    return createPaypalTransaction();
  };

  const onPaypalButtonsApprove = async (data: OnApproveData, _actions: OnApproveActions) => {
    onSuccessPaypalTransaction();
  };

  const onPaypalButtonsError = (error: Record<string, unknown>) => {
    onErrorPaypalTransaction(error)
  };

  const handlePaypalHostedFieldsSubmit = async () => {
    if (renderInstance) {
      setTransactionError('');
      renderInstance
        .submit()
        .then((response) => { 
          onSuccessPaypalTransaction()
        })
        .catch((error: Record<string, unknown>) => {
          onErrorPaypalTransaction(error)
        });
    }
  };

  const onSuccessPaypalTransaction = () => {
    next(); 
  };

  const onErrorPaypalTransaction = (error: Record<string, unknown>) => {
    const errorMsg = getBackendErrorMsg('SDK Paypal ERROR', error);
    logBackendError(errorMsg)
    setTransactionError(intl.formatMessage({ id: 'checkout.errors.checkPaymentMethod' }));
  };

  const initPaypal = useCallback(async () => {
    if (typeof supportsHostedFields === 'boolean' && !!supportsHostedFields) {
      setLoadedPaypal(true);
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
  }, [createPaypalTransaction, paypal.HostedFields, supportsHostedFields]);

  useEffect(() => {
    if (isResolved) {
      setSupportsHostedFields(paypal.HostedFields?.isEligible());
    }
  }, [setSupportsHostedFields, options, isResolved, paypal]);

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
            <div 
              style={{           
                marginTop: '10px',   
              }}
            >
              <PayPalButtons
                disabled={false}
                forceReRender={[totalPrice]}
                fundingSource={undefined}
                createOrder={handlePaypalButtonsSubmit}
                onApprove={onPaypalButtonsApprove}
                onError={onPaypalButtonsError}
              />
              <div>
                <label htmlFor="card-number">Card Number</label>
                <div id="card-number"></div>
                <label htmlFor="expiration-date">Expiration Date</label>
                <div id="expiration-date"></div>
                <label htmlFor="cvv">CVV</label>
                <div id="cvv"></div>
                {/*<button onClick={handlePaypalHostedFieldsSubmit}>
                  Pay with Card
                </button>*/}
              </div>
            </div>
          ,
        }
      ]}
      formButtons={{
        submit: {
          text: { 
            id: 'app.continueBtn',
          },
          onSubmit: handlePaypalHostedFieldsSubmit,
          disabled: !renderInstance,
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
