import { Dispatch, SetStateAction } from 'react';

import CheckoutConfirmForm from '@components/forms/checkout/CheckoutConfirmForm';

type CheckoutConfirmSectionProps = {
  back: () => void,
  setTransactionError: Dispatch<SetStateAction<string>>,
  confirmToken: string,
};

const CheckoutConfirmSection = (props: CheckoutConfirmSectionProps) => {
  const { back, setTransactionError, confirmToken } = props;

  return (
    <CheckoutConfirmForm 
      back={back}
      setTransactionError={setTransactionError}
      confirmToken={confirmToken}
    />
  );
};

export default CheckoutConfirmSection;