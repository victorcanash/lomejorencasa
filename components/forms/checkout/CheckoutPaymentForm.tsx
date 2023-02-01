import { useState, Dispatch, SetStateAction, ChangeEvent } from 'react';

import { useIntl } from 'react-intl';
import { Dropin, PaymentMethodPayload } from 'braintree-web-drop-in';
import DropIn from 'braintree-web-drop-in-react';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import type { FormButtonsCheckout } from '@lib/types/forms';
import { useAuthContext } from '@lib/contexts/AuthContext';
import usePayments from '@lib/hooks/usePayments';
import BaseForm from '@components/forms/BaseForm';

type CheckoutPaymentFormProps = {
  next?: () => void,
  back?: () => void,
  transactionError?: string,
  setTransactionError?: Dispatch<SetStateAction<string>>,
};

const CheckoutPaymentForm = (props: CheckoutPaymentFormProps) => {
  const { next, back, transactionError, setTransactionError } = props;

  const { braintreeToken, setCheckoutPayment } = useAuthContext();

  const intl = useIntl();

  const { checkPaymentMethod, errorMsg, successMsg } = usePayments();

  const [dropinInstance, setDropinInstance] = useState<Dropin | undefined>(undefined)
  const [rememberFieldValue, setRememberFieldValue] = useState(true)

  const handleRememberField = (_event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setRememberFieldValue(checked);
  };

  const handleBack = () => {
    if (setTransactionError) {
      setTransactionError('');
    }
    if (back) {
      back();
    }
  };

  const handleSubmit = async () => {
    if (!dropinInstance) {
      return;
    }
    if (setTransactionError) {
      setTransactionError('');
    }
    checkPaymentMethod(dropinInstance, onSuccessCheckPaymentMethod);
  };

  const onSuccessCheckPaymentMethod = (paymentPayload: PaymentMethodPayload) => {
    setCheckoutPayment({
      methodPayload: paymentPayload,
      remember: rememberFieldValue,
    });
    setTimeout(() => { 
      if (next) {
        next(); 
      }
    }, 10);
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
          extraElements: braintreeToken ?
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
            </> : undefined,
        }
      ]}
      formButtons={{
        submit: {
          text: { 
            id: 'app.continueBtn',
          },
          onSubmit: handleSubmit,
          disabled: !dropinInstance,
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

export default CheckoutPaymentForm;
