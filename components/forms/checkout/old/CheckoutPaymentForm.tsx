import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

import { useAuthContext } from '@lib/contexts/AuthContext';
import CheckoutBraintreeForm from '@components/forms/checkout/old/CheckoutBraintreeForm';
import CheckoutPaypalForm from '@components/forms/checkout/old/CheckoutPaypalForm';

type CheckoutPaymentFormProps = {
  next: () => void,
  back: () => void,
  transactionError: string | undefined,
  setTransactionError: Dispatch<SetStateAction<string>>,
};

const CheckoutPaymentForm = (props: CheckoutPaymentFormProps) => {
  const { 
    next, 
    back, 
    transactionError, 
    setTransactionError 
  } = props;

  const { braintreeToken, paypal } = useAuthContext();

  const [rememberFieldValue, setRememberFieldValue] = useState(true);

  const handleBack = async () => {
    setTransactionError('');
    back();
  };

  const handleRememberField = (_event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setRememberFieldValue(checked);
  };

  return (
    <>
      { braintreeToken &&
        <CheckoutBraintreeForm
          next={next}
          handleBack={handleBack}
          transactionError={transactionError}
          setTransactionError={setTransactionError}
          remember={rememberFieldValue}
          handleRemember={handleRememberField}
        />
      }
      { (!braintreeToken && paypal) &&
        <CheckoutPaypalForm
          next={next}
          handleBack={handleBack}
          transactionError={transactionError}
          setTransactionError={setTransactionError}
          remember={rememberFieldValue}
          handleRemember={handleRememberField}
        />
      } 
    </>
  );
};

export default CheckoutPaymentForm;