import { useState } from 'react';
import { useRouter } from 'next/router';

import { useSnackbar } from 'notistack';
import { Dropin, PaymentMethodPayload } from 'braintree-web-drop-in';

import { pages } from '@core/config/navigation.config';
import { Order } from '@core/types/orders';
import { 
  checkPaymentMethod as checkPaymentMethodMW, 
  createTransaction as createTransactionMW, 
} from '@core/utils/payments';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';

const usePayments = () => {
  const { setLoading } = useAppContext();
  const { token, setBraintreeToken } = useAuthContext();

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const checkPaymentMethod = (dropin: Dropin, onSuccess?: (paymentPayload: PaymentMethodPayload) => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    checkPaymentMethodMW(dropin)
      .then((response: {paymentPayload: PaymentMethodPayload}) => {
        onCheckPaymentMethodSuccess(response.paymentPayload, onSuccess);
      }).catch((_error: Error) => {
        dropin.clearSelectedPaymentMethod();
        const errorMsg = 'Something went wrong. Try again or select a different payment method.';
        setErrorMsg(errorMsg);
        setLoading(false);
      })
  };

  const onCheckPaymentMethodSuccess = (paymentPayload: PaymentMethodPayload, onSuccess?: (paymentPayload: PaymentMethodPayload) => void) => {
    if (onSuccess) {
      onSuccess(paymentPayload);
    }
    setLoading(false);
    setSuccessMsg('Checked payment method');
  };

  const createTransaction = async (paymentMethodNonce: string, onError?: (message: string) => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    await createTransactionMW(token, paymentMethodNonce)
      .then((response: { braintreeToken: string, order: Order }) => {
        setBraintreeToken(response.braintreeToken);
        onCreateTransactionSuccess();
      }).catch((error) => {
        let errorMsg = error.message;
        if (errorMsg.includes('Create bigbuy order error')) {
          onCreateTransactionSuccess();
          return;
        }
        else if (errorMsg.includes('Insufficient Funds')) {
          errorMsg = 'Failed proceeding to payment, insufficient funds';
        } else {
          errorMsg = 'Failed proceeding to payment, modify your data or choose a different payment method';
        }
        setErrorMsg(errorMsg);
        setLoading(false);
        if (onError) {
          onError(errorMsg);
        }
      });
  };

  const onCreateTransactionSuccess = () => {
    setLoading(false);
    setSuccessMsg('Created transaction');
    enqueueSnackbar('Order completed, you will receive an email with all order details', { variant: 'success' });
    router.push(pages.home.path);
  };

  return {
    errorMsg,
    successMsg,
    checkPaymentMethod,
    createTransaction,
  };
};

export default usePayments;
