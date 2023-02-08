import { useState } from 'react';
import { useRouter } from 'next/router';

import { useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';
import { Dropin, PaymentMethodPayload } from 'braintree-web-drop-in';

import type { Order } from '@core/types/orders';
import type { GuestUser } from '@core/types/user';
import { 
  checkPaymentMethod as checkPaymentMethodMW, 
  createTransaction as createTransactionMW, 
} from '@core/utils/payments';

import { pages } from '@lib/constants/navigation';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { useCartContext } from '@lib/contexts/CartContext';
import useAuth from '@lib/hooks/useAuth';

const usePayments = () => {
  const { setLoading } = useAppContext();
  const { token, user, checkoutPayment, isLogged } = useAuthContext();
  const { cart, removeCart } = useCartContext();

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

  const createTransaction = async (onError?: (message: string) => void) => {
    if (!checkoutPayment || !user.shipping || !user.billing || !user.email || cart.items.length <= 0) {
      const errorMsg = intl.formatMessage({ id: 'checkout.errors.createTransaction' });
      setErrorMsg(errorMsg);
      if (onError) {
        onError(errorMsg);
      }
      setLoading(false);
      return;
    }
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    await createTransactionMW(
      isLogged() ? token : undefined, 
      intl.locale, 
      checkoutPayment,
      !isLogged() ? user as GuestUser : undefined,
      !isLogged() ? cart : undefined
    )
      .then((_response: { order?: Order }) => {
        onCreateTransactionSuccess();
      }).catch((error) => {
        let errorMsg = error.message;
        if (errorMsg.includes('Insufficient Funds')) {
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
    if (isLogged()) {
      await getLogged(() => {
        // On success
        setLoading(false);
      }, async (_message: string) => {
        // On error
        await logout()
      })
    } else {
      removeCart();
      setLoading(false);
    }
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
