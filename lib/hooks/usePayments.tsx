import { useState } from 'react';
import { useRouter } from 'next/router';

import { useIntl } from 'react-intl';
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
import useAuth from '@lib/hooks/useAuth';

const usePayments = () => {
  const { setLoading } = useAppContext();
  const { token } = useAuthContext();

  const router = useRouter();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();

  const { getLogged, logout } = useAuth()

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
        const errorMsg = intl.formatMessage({ id: 'checkout.errors.checkPaymentMethod' });
        setErrorMsg(errorMsg);
        setLoading(false);
      })
  };

  const onCheckPaymentMethodSuccess = (paymentPayload: PaymentMethodPayload, onSuccess?: (paymentPayload: PaymentMethodPayload) => void) => {
    if (onSuccess) {
      onSuccess(paymentPayload);
    }
    setLoading(false);
    setSuccessMsg(intl.formatMessage({ id: 'checkout.successes.checkPaymentMethod' }));
  };

  const createTransaction = async (paymentMethodNonce: string, onError?: (message: string) => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    await createTransactionMW(token, intl.locale, paymentMethodNonce)
      .then((_response: { order: Order }) => {
        onCreateTransactionSuccess();
      }).catch((error) => {
        let errorMsg = error.message;
        if (errorMsg.includes('Create bigbuy order error') || 
            errorMsg.includes('Get order info error')) {
          onCreateTransactionSuccess();
          return;
        }
        else if (errorMsg.includes('Insufficient Funds')) {
          errorMsg = intl.formatMessage({ id: 'checkout.errors.insufficientFunds' });
        } else {
          errorMsg = intl.formatMessage({ id: 'checkout.errors.createTransaction' });
        }
        setErrorMsg(errorMsg);
        setLoading(false);
        if (onError) {
          onError(errorMsg);
        }
      });
  };

  const onCreateTransactionSuccess = async () => {
    router.push(pages.home.path);
    await getLogged(() => {
      // On success
      setLoading(false);
    }, async (_message: string) => {
      // On error
      await logout()
    })
    setSuccessMsg(intl.formatMessage({ id: 'checkout.successes.createTransaction'}));
    enqueueSnackbar(intl.formatMessage(
      { id: 'checkout.successes.createOrder' }), 
      { variant: 'success' }
    );
  };

  return {
    errorMsg,
    successMsg,
    checkPaymentMethod,
    createTransaction,
  };
};

export default usePayments;
