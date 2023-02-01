import { Dispatch, SetStateAction } from 'react';

import CheckoutPaymentForm from '@components/forms/checkout/CheckoutPaymentForm';

type CheckoutPaymentSectionProps = {
  next: () => void,
  back: () => void,
  transactionError: string,
  setTransactionError: Dispatch<SetStateAction<string>>,
};

const CheckoutPaymentSection = (props: CheckoutPaymentSectionProps) => {
  const { next, back, transactionError, setTransactionError } = props;

  return (
    <CheckoutPaymentForm 
      next={next}
      back={back}
      transactionError={transactionError}
      setTransactionError={setTransactionError}
    />
  );
};

export default CheckoutPaymentSection;