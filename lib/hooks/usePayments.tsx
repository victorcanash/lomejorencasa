import { useState } from 'react';
import { useRouter } from 'next/router';

import { useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';
import { Dropin, PaymentMethodPayload } from 'braintree-web-drop-in';

// import envConfig from '@core/config/env.config';
import type { Order } from '@core/types/orders';
import type { GuestUser } from '@core/types/user';
import type { CheckoutPayment } from '@core/types/checkout';
import type { Cart } from '@core/types/cart';
import type { AuthLogin } from '@core/types/auth';
import { 
  checkBraintreePaymentMethod as checkBPaymentMethodMW,
  getGuestUserData as getGuestUserDataMW,
  sendConfirmTransactionEmail as sendConfirmTransactionEmailMW,
  createBraintreeTransaction as createBTransactionMW, 
  createPaypalTransaction as createPTransactionMW,
  capturePaypalTransaction as capturePTransactionMW,
} from '@core/utils/payments';

import { pages } from '@lib/constants/navigation';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { useCartContext } from '@lib/contexts/CartContext';

const usePayments = () => {
  const { setLoading } = useAppContext();
  const { token, user, setUser, removeUser, checkoutPayment, setCheckoutPayment, isLogged } = useAuthContext();
  const { cart, initCart, cleanCart } = useCartContext();

  const router = useRouter();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const checkBraintreePaymentMethod = (dropin: Dropin, onSuccess?: (paymentPayload: PaymentMethodPayload) => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    checkBPaymentMethodMW(dropin)
      .then((response: {paymentPayload: PaymentMethodPayload}) => {
        if (onSuccess) {
          onSuccess(response.paymentPayload);
        }
        setLoading(false);
        setSuccessMsg(intl.formatMessage({ id: 'checkout.successes.checkPaymentMethod' }));
      }).catch((_error: Error) => {
        dropin.clearSelectedPaymentMethod();
        const errorMsg = intl.formatMessage({ id: 'checkout.errors.checkPaymentMethod' });
        setErrorMsg(errorMsg);
        setLoading(false);
      })
  };

  const getGuestUserData = async (confirmationToken: string, onSuccess?: () => void, onError?: (message: string) => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    await getGuestUserDataMW(confirmationToken).then(async (response: {checkoutPayment: CheckoutPayment, user: GuestUser, cart: Cart}) => {
      setCheckoutPayment(response.checkoutPayment);
      setUser(response.user);
      initCart(response.cart);
      enqueueSnackbar(intl.formatMessage(
        { id: 'checkout.successes.getGuestUserData' }), 
        { variant: 'success', autoHideDuration: 10000 }
      );
      if (onSuccess) {
        onSuccess();
      }
    }).catch(async (error: Error) => {
      enqueueSnackbar(intl.formatMessage(
        { id: 'checkout.errors.getGuestUserData' }), 
        { variant: 'error', autoHideDuration: 10000 }
      );
      if (onError) {
        onError(error.message);
      }
    });
  }

  const sendConfirmTransactionEmail = async (authLogin: AuthLogin, onError?: (message: string) => void) => {
    setUser({
      ...user,
      email: authLogin.email,
    });
    if (missingTransactionData(true, true, onError, authLogin.email)) {
      if (onError) {
        onError(intl.formatMessage({ id: 'checkout.errors.createTransaction' }));
      }
      return;
    }
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    await sendConfirmTransactionEmailMW( 
      intl.locale, 
      checkoutPayment as CheckoutPayment,
      {
        ...user,
        email: authLogin.email,
      } as GuestUser,
      cart,
      pages.checkout,
    )
      .then(() => {
        onSendConfirmTransactionEmailSuccess();
      }).catch((error) => {
        let errorMsg = error.message;
        if (errorMsg.includes('The email entered belongs to a registered user')) {
          errorMsg = intl.formatMessage({ id: 'checkout.errors.sendConfirmTransactionEmail.registered' });
        } else {
          errorMsg = intl.formatMessage({ id: 'checkout.errors.sendConfirmTransactionEmail.default' });
        }
        setErrorMsg(errorMsg);
        setLoading(false);
        if (onError) {
          onError(errorMsg);
        }
      });
  };

  const onSendConfirmTransactionEmailSuccess = async () => {
    router.push(pages.home.path);
    cleanCart();
    setSuccessMsg(intl.formatMessage({ id: 'checkout.successes.sendEmail'}));
    enqueueSnackbar(intl.formatMessage(
      { id: 'checkout.successes.sendConfirmTransactionEmail' }, { time: '30' }/*{ time: envConfig.NEXT_PUBLIC_CONFIRMATION_TOKEN_EXPIRY }*/), 
      { variant: 'success', autoHideDuration: 10000 }
    );
  };

  const createBraintreeTransaction = async (confirmToken?: string, onError?: (message: string) => void) => {
    if (!confirmToken && !isLogged()) {
      if (onError) {
        onError(intl.formatMessage({ id: 'checkout.errors.createTransaction' }));
      }
      setLoading(false);
      return;
    }
    if (missingTransactionData(true, true, onError)) {
      if (onError) {
        onError(intl.formatMessage({ id: 'checkout.errors.createTransaction' }));
      }
      setLoading(false);
      return;
    }
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    await createBTransactionMW(
      isLogged() ? token : confirmToken || '', 
      intl.locale, 
      checkoutPayment as CheckoutPayment,
      !isLogged() ? user as GuestUser : undefined,
      !isLogged() ? cart : undefined
    )
      .then((_response: { order?: Order }) => {
        onCompleteTransaction();
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

  const createPaypalTransaction = async (confirmToken?: string) => {
    return new Promise<string>(async (resolve, reject) => {
      if (missingTransactionData(false, false)) {
        reject(intl.formatMessage({ id: 'checkout.errors.createTransaction' }));
      }
      setLoading(true);
      setErrorMsg('');
      setSuccessMsg('');
      await createPTransactionMW(
        isLogged() ? token : confirmToken || '', 
        intl.locale,
        !isLogged() ? user as GuestUser : undefined,
        !isLogged() ? cart : undefined
      )
        .then((response: { paypalOrderId: string }) => {
          setLoading(false);
          resolve(response.paypalOrderId)
        }).catch((error) => {
          let errorMsg = error.message;
          if (errorMsg.includes('Insufficient Funds')) {
            errorMsg = intl.formatMessage({ id: 'checkout.errors.insufficientFunds' });
          } else {
            errorMsg = intl.formatMessage({ id: 'checkout.errors.createTransaction' });
          }
          setErrorMsg(errorMsg);
          setLoading(false);
          reject(errorMsg)
        });
    });
  };

  const capturePaypalTransaction = async (confirmToken?: string, onError?: (message: string) => void) => {
    if (!confirmToken && !isLogged()) {
      if (onError) {
        onError(intl.formatMessage({ id: 'checkout.errors.createTransaction' }));
      }
      setLoading(false);
      return;
    }
    if (!checkoutPayment?.paypalPayload?.orderId) {
      if (onError) {
        onError(intl.formatMessage({ id: 'checkout.errors.createTransaction' }));
      }
      setLoading(false);
      return;
    }
    if (missingTransactionData(true, true, onError)) {
      if (onError) {
        onError(intl.formatMessage({ id: 'checkout.errors.createTransaction' }));
      }
      setLoading(false);
      return;
    }
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    await capturePTransactionMW(
      isLogged() ? token : confirmToken || '', 
      intl.locale, 
      checkoutPayment?.paypalPayload?.orderId,
      !isLogged() ? user as GuestUser : undefined,
      !isLogged() ? cart : undefined
    )
      .then((_response: { order?: Order }) => {
        onCompleteTransaction();
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

  const onCompleteTransaction = async () => {
    setSuccessMsg(intl.formatMessage({ id: 'checkout.successes.createTransaction'}));
    enqueueSnackbar(intl.formatMessage(
      { id: 'checkout.successes.createOrder' }), 
      { variant: 'success', autoHideDuration: 10000 }
    );
    router.push(pages.home.path);
    if (!isLogged()) {
      removeUser();
    } 
    cleanCart(); 
  };

  const missingTransactionData = (checkCheckoutPayment: boolean, checkUserEmail: boolean, onError?: (message: string) => void, userEmail?: string) => {
    if ((checkCheckoutPayment && !checkoutPayment) || 
        !user.shipping || 
        !user.billing || 
        (checkUserEmail && (!user.email && !userEmail)) || 
        cart.items.length <= 0) {
      const errorMsg = intl.formatMessage({ id: 'checkout.errors.createTransaction' });
      setErrorMsg(errorMsg);
      if (onError) {
        onError(errorMsg);
      }
      setLoading(false);
      return true;
    }
    return false;
  }

  return {
    errorMsg,
    successMsg,
    checkBraintreePaymentMethod,
    getGuestUserData,
    sendConfirmTransactionEmail,
    createBraintreeTransaction,
    createPaypalTransaction,
    capturePaypalTransaction,
  };
};

export default usePayments;
