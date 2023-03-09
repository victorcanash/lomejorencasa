import { Dispatch, SetStateAction, ChangeEvent, useState } from 'react';

import { useIntl } from 'react-intl';
import { Dropin } from 'braintree-web-drop-in';
import DropIn from 'braintree-web-drop-in-react';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import type { FormButtonsCheckout } from '@lib/types/forms';
import { useAuthContext } from '@lib/contexts/AuthContext';
import usePayments from '@lib/hooks/usePayments';
import BaseForm from '@components/forms/BaseForm';

type CheckoutBraintreeFormProps = {
  next: () => void,
  handleBack: () => Promise<void>,
  transactionError: string | undefined,
  setTransactionError: Dispatch<SetStateAction<string>>,
  remember: boolean,
  handleRemember: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void,
};

const CheckoutBraintreeForm = (props: CheckoutBraintreeFormProps) => {
  const {
    next,
    handleBack,
    transactionError, 
    setTransactionError,
    remember,
    handleRemember,
  } = props;

  const { braintreeToken, isLogged } = useAuthContext();

  const intl = useIntl();

  const { checkBraintreePaymentMethod, errorMsg, successMsg } = usePayments();

  const [braintreeDropin, setBraintreeDropin] = useState<Dropin | undefined>(undefined);

  const handleBraintreeSubmit = async () => {
    if (!braintreeDropin) {
      return;
    }
    setTransactionError('');
    checkBraintreePaymentMethod(braintreeDropin, remember, onSuccessCheckBPaymentMethod);
  };

  const onSuccessCheckBPaymentMethod = () => {
    next(); 
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
                    authorization: braintreeToken || '',
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
          onSubmit: handleBraintreeSubmit,
          disabled: !braintreeDropin,
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

export default CheckoutBraintreeForm;
