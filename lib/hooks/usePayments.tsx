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
  getPaypalUserToken as getPaypalUserTokenMW,
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

  const getPaypalUserToken = async () => {
    let paypalUserToken: string | undefined
    if (!isLogged()) {
      return paypalUserToken;
    }
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    await getPaypalUserTokenMW(token, intl.locale)
      .then((response: { paypalUserToken: string }) => {
        paypalUserToken = response.paypalUserToken
      }).catch((error) => {
        console.log(error.message)
      })
    setLoading(false)
    return paypalUserToken
  }

  const checkBraintreePaymentMethod = (dropin: Dropin, remember: boolean, onSuccess?: () => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    checkBPaymentMethodMW(dropin)
      .then((response: { paymentPayload: PaymentMethodPayload }) => {
        setCheckoutPayment({
          braintreePayload: response.paymentPayload,
          remember: remember,
        });
        setTimeout(() => {
          setLoading(false);
          setSuccessMsg(intl.formatMessage({ id: 'checkout.successes.checkPaymentMethod' }));
          if (onSuccess) {
            onSuccess();
          }
        }, 10);
      }).catch((_error: Error) => {
        dropin.clearSelectedPaymentMethod();
        const errorMsg = intl.formatMessage({ id: 'checkout.errors.checkPaymentMethod' });
        setErrorMsg(errorMsg);
        setLoading(false);
      })
  };

  const createPaypalTransaction = async () => {
    return new Promise<string>(async (resolve, reject) => {
      const confirmToken = typeof router.query.token == 'string' ? router.query.token : '';
      if (missingTransactionData(false)) {
        reject(intl.formatMessage({ id: 'checkout.errors.checkPaymentMethod' }));
      }
      setLoading(true);
      setErrorMsg('');
      setSuccessMsg('');
      await createPTransactionMW(
        isLogged() ? token : confirmToken || '', 
        intl.locale,
        checkoutPayment,
        !isLogged() ? {
          ...user,
          email: user.email ? user.email : '',
        } : undefined,
        !isLogged() ? cart : undefined
      )
        .then((response: { paypalOrderId: string }) => {   
          resolve(response.paypalOrderId)
        }).catch((_error) => {
          const errorMsg = intl.formatMessage({ id: 'checkout.errors.checkPaymentMethod' });
          setErrorMsg(errorMsg);
          setLoading(false);
          reject(errorMsg)
        });
    });
  };

  const sendConfirmTransactionEmail = async (authLogin: AuthLogin, onError?: (message: string) => void) => {
    setUser({
      ...user,
      email: authLogin.email,
    });
    if (missingTransactionData(true, onError, authLogin.email)) {
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
      checkoutPayment,
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

  const getGuestUserData = async (confirmationToken: string, onSuccess?: () => void, onError?: (message: string) => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    await getGuestUserDataMW(confirmationToken)
      .then(async (response: {checkoutPayment: CheckoutPayment, user: GuestUser, cart: Cart}) => {
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

  const createBraintreeTransaction = async (confirmToken?: string, onError?: (message: string) => void) => {
    if (!confirmToken && !isLogged()) {
      if (onError) {
        onError(intl.formatMessage({ id: 'checkout.errors.createTransaction' }));
      }
      setLoading(false);
      return;
    }
    if (missingTransactionData(true, onError)) {
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
      checkoutPayment,
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
    if (missingTransactionData(true, onError)) {
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
      checkoutPayment,
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

  const missingTransactionData = (checkUserEmail: boolean, onError?: (message: string) => void, userEmail?: string) => {
    if (!user.shipping || !user.billing || 
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
    setSuccessMsg,
    getPaypalUserToken,
    checkBraintreePaymentMethod,
    createPaypalTransaction,
    sendConfirmTransactionEmail,
    getGuestUserData,
    createBraintreeTransaction,
    capturePaypalTransaction,
  };
};

export default usePayments;
