import { Dispatch, SetStateAction } from 'react';

import CheckoutConfirmForm from '@components/forms/checkout/CheckoutConfirmForm';

type CheckoutConfirmSectionProps = {
  back: () => void,
  setTransactionError: Dispatch<SetStateAction<string>>,
};

const CheckoutConfirmSection = (props: CheckoutConfirmSectionProps) => {
  const { back, setTransactionError } = props;

  return (
    <CheckoutConfirmForm 
      back={back}
      setTransactionError={setTransactionError}
    />
  );
};

export default CheckoutConfirmSection;