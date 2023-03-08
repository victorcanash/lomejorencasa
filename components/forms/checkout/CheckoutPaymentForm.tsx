import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

import { useAuthContext } from '@lib/contexts/AuthContext';
import CheckoutBraintreeForm from '@components/forms/checkout/CheckoutBraintreeForm';
import CheckoutPaypalForm from '@components/forms/checkout/CheckoutPaypalForm';

type CheckoutPaymentFormProps = {
  next: () => void,
  back: () => void,
  transactionError: string | undefined,
  setTransactionError: Dispatch<SetStateAction<string>>,
};

const CheckoutPaymentForm = (props: CheckoutPaymentFormProps) => {
  const { next, back, transactionError, setTransactionError } = props;

  const { 
    paypalMerchantId, 
    paypalClientId, 
    paypalToken,
    isLogged,
  } = useAuthContext();

  const [rememberFieldValue, setRememberFieldValue] = useState(isLogged() ? true : false);

  const handleBack = async () => {
    setTransactionError('');
    back();
  };

  const handleRememberField = (_event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setRememberFieldValue(checked);
  };

  return (
    <>
      { (!paypalMerchantId || !paypalClientId || !paypalToken) ?
        <CheckoutBraintreeForm
          next={next}
          handleBack={handleBack}
          transactionError={transactionError}
          setTransactionError={setTransactionError}
          remember={rememberFieldValue}
          handleRemember={handleRememberField}
        />
        :
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
