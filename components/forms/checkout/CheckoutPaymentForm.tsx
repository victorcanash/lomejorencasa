import { Dispatch, SetStateAction } from 'react';

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
    paypalToken 
  } = useAuthContext();

  const handleBack = async () => {
    setTransactionError('');
    back();
  };

  return (
    <>
      { (!paypalMerchantId || !paypalClientId || !paypalToken) ?
        <CheckoutBraintreeForm
          next={next}
          handleBack={handleBack}
          transactionError={transactionError}
          setTransactionError={setTransactionError}
        />
        :
        <CheckoutPaypalForm
          next={next}
          handleBack={handleBack}
          transactionError={transactionError}
          setTransactionError={setTransactionError}
        />
      } 
    </>
  );
};

export default CheckoutPaymentForm;
