import { useState, useMemo, useEffect, useCallback, ChangeEvent } from 'react';
import { useRouter } from 'next/router';

import { useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';
import { 
  CreateOrderData, 
  CreateOrderActions, 
  OnApproveData, 
  OnApproveActions, 
  HostedFieldsHandler,
} from '@paypal/paypal-js';
import { usePayPalScriptReducer } from '@paypal/react-paypal-js';

import type { CheckoutContact, CheckoutData } from '@core/types/checkout';
import { 
  getPaypalUserToken as getPaypalUserTokenMW,
  createPaypalTransaction as createPTransactionMW,
  capturePaypalTransaction as capturePTransactionMW,
} from '@core/utils/payments';
import { getBackendErrorMsg, logBackendError } from '@core/utils/errors';
import { getCountryCode } from '@core/utils/addresses';

import { pages } from '@lib/constants/navigation';
import { paypalHostedFieldsStyle } from '@lib/constants/themes/elements';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { useCartContext } from '@lib/contexts/CartContext';
import { GuestUser, User } from '@core/types/user';

const usePaypal = (contactFormValues: CheckoutContact) => {
  const { setLoading } = useAppContext();
  const { 
    token, 
    user,
    setUser,
    checkoutData,
    setCheckoutData,
    isLogged,
    paypal,
  } = useAuthContext();
  const { cart, cleanCart } = useCartContext();

  const router = useRouter();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const [{ isResolved, options }, dispatch] = usePayPalScriptReducer();

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loadedAdvancedCards, setLoadedAdvancedCards] = useState(false);
  const [advancedCardsInstance, setAdvancedCardsInstance] = useState<HostedFieldsHandler | undefined>(undefined);
  const [supportsAdvancedCards, setSupportsAdvancedCards] = useState<boolean | undefined>(undefined);
  const [rememberFieldValue, setRememberFieldValue] = useState(true);
  const [cardHolderNameFieldValue, setCardHolderNameFieldValue] = useState(
    checkoutData.paypalPayload?.card?.holderName || ''
  );

  const snachbarDuration = 10000;

  const handleRememberField = (_event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setRememberFieldValue(checked);
  };
  const handleCardHolderNameField = (event: ChangeEvent<HTMLInputElement>) => {
    setCardHolderNameFieldValue(event.target.value);
  };

  const newUser = useMemo(() => {
    if (isLogged()) {
      return {
        ...user,
        shipping: contactFormValues.shipping,
        billing: contactFormValues.billing,
      } as User;
    } else {
      return{
        ...user,
        email: contactFormValues.checkoutEmail,
        shipping: contactFormValues.shipping,
        billing: contactFormValues.billing,
      } as GuestUser;
    }
  }, [contactFormValues.billing, contactFormValues.checkoutEmail, contactFormValues.shipping, isLogged, user]);

  const newCheckoutData = useMemo(() => {
    return {
      ...checkoutData,
      ...contactFormValues,
    } as CheckoutData;
  }, [checkoutData, contactFormValues]);

  const setAuthData = useCallback(() => {
    setCheckoutData({
      ...checkoutData,
      ...contactFormValues,
    });
    if (isLogged()) {
      setUser({
        ...user,
        shipping: contactFormValues.shipping,
        billing: contactFormValues.billing,
      });
    } else {
      setUser({
        ...user,
        email: contactFormValues.checkoutEmail,
        shipping: contactFormValues.shipping,
        billing: contactFormValues.billing,
      });
    }
  }, [checkoutData, contactFormValues, isLogged, setCheckoutData, setUser, user]);

  const onPaypalButtonsSubmit = async (_data: CreateOrderData, _actions: CreateOrderActions) => {
    return createPaypalTransaction();
  };

  const onPaypalButtonsApprove = async (data: OnApproveData, _actions: OnApproveActions) => {
    const captureCheckoutData = {
      ...checkoutData,
      paypalPayload: {
        orderId: data.orderID,
      },
      remember: rememberFieldValue,
    } as CheckoutData;
    setCheckoutData(captureCheckoutData);
    onSuccessPaypalTransaction(captureCheckoutData);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPaypalButtonsError = (error: any) => {
    onErrorPaypalTransaction(error);
  };

  const onAdvancedCardsSubmit = async () => {
    if(!advancedCardsInstance) {
      onErrorPaypalTransaction(new Error());
      return;
    }
    if (!cardHolderNameFieldValue || cardHolderNameFieldValue.length < 1) {
      onErrorPaypalTransaction('cardholdername');
      return;
    }
    advancedCardsInstance
      .submit({
        cardholderName: cardHolderNameFieldValue,
        billingAddress: {
          streetAddress: contactFormValues.billing?.addressLine1,
          extendedAddress: contactFormValues.billing?.addressLine2,
          region: contactFormValues.billing?.country,
          locality: contactFormValues.billing?.locality,
          postalCode: contactFormValues.billing?.postalCode,
          countryCodeAlpha2: contactFormValues.billing?.country ? getCountryCode(contactFormValues.billing?.country) : undefined,
        },
        contingencies: ['SCA_WHEN_REQUIRED'],
      }).then((response) => {
        const captureCheckoutData = {
          ...checkoutData,
          paypalPayload: {
            orderId: response.orderId,
            card: {
              type: response.card.brand,
              lastFour: response.card.last_digits,
              holderName: cardHolderNameFieldValue,
            },
          },
          remember: rememberFieldValue,
        } as CheckoutData;
        setCheckoutData(captureCheckoutData);
        if (response.liabilityShift && response.liabilityShift !== 'POSSIBLE') {
          onErrorPaypalTransaction(new Error('3dSecure'));
          return;
        }
        onSuccessPaypalTransaction(captureCheckoutData);
      }).catch((error: Error) => {
        onErrorPaypalTransaction(error);
      });
  };
  const getPaypalUserToken = useCallback(async () => {
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
      }).catch((_error) => {
      })
    setLoading(false)
    return paypalUserToken
  }, [intl.locale, isLogged, setLoading, token]);

  const createPaypalTransaction = useCallback(async () => {
    console.log(newCheckoutData);
    console.log(newUser);
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    setAuthData();
    return new Promise<string>(async (resolve, reject) => {
      await createPTransactionMW(
        isLogged() ? token : '', 
        intl.locale,
        newCheckoutData,
        !isLogged() ? newUser : undefined,
        !isLogged() ? cart : undefined
      )
        .then((response: { paypalTransactionId: string }) => {
          setLoading(false);
          resolve(response.paypalTransactionId);
        }).catch((error) => {
          const errorMsg = error.message;
          setErrorMsg(errorMsg);
          setLoading(false);
          reject(errorMsg)
        });
    });
  }, [cart, intl.locale, isLogged, newCheckoutData, newUser, setAuthData, setLoading, token]);

  const onSuccessPaypalTransaction = (captureCheckoutData: CheckoutData) => {
    capturePaypalTransaction(captureCheckoutData);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onErrorPaypalTransaction = (error: any, capturing?: boolean) => {
    setLoading(false);
    const errorMsg = getBackendErrorMsg('SDK Paypal ERROR', error);
    logBackendError(errorMsg);
    setSuccessMsg('');
    let errorDetail = '';
    if (error.details && error.details.length > 0 && error.details[0].field) {
      errorDetail = error.details[0].field as string;
      if (errorDetail.includes('card/number')) {
        setErrorMsg(intl.formatMessage({ id: 'checkout.errors.checkPaymentMethodCardFieldsNumber' }));
      } else if (errorDetail.includes('card/cvv')) {
        setErrorMsg(intl.formatMessage({ id: 'checkout.errors.checkPaymentMethodCardFieldsCVV' }));
      } else if (errorDetail.includes('card/expiry')) {
        setErrorMsg(intl.formatMessage({ id: 'checkout.errors.checkPaymentMethodCardFieldsExpiry' }));
      }
      return;
    }
    if (error.message && error.message.includes('cardholdername')) {
      setErrorMsg(intl.formatMessage({ id: 'checkout.errors.checkPaymentMethodCardFieldsHolderName' }));
    } else if (error.message && error.message.includes('3dSecure')) {
      setErrorMsg(intl.formatMessage({ id: 'checkout.errors.checkPaymentMethodCardFields3dSecure' }));
    } else if (error.message && error.message.includes('Insufficient Funds')) {
      setErrorMsg(intl.formatMessage({ id: 'checkout.errors.insufficientFunds' }));
    } else if (!capturing) {
      setErrorMsg(intl.formatMessage({ id: 'checkout.errors.checkPaymentMethod' }));
    } else {
      setErrorMsg(intl.formatMessage({ id: 'checkout.errors.createTransaction' }));
    }
  };

  const initHostedFields = useCallback(async () => {
    if (typeof supportsAdvancedCards === 'boolean' && !!supportsAdvancedCards) {
      setLoadedAdvancedCards(true);
      await getPaypalUserToken().then((paypalUserToken?: string) => { 
        if (paypalUserToken) {
          dispatch({
            type: 'resetOptions',
            value: {
                ...options,
                'data-user-id-token': paypalUserToken,
            },
          });
        }
      });  
      const instance = await window.paypal.HostedFields?.render({
        createOrder: createPaypalTransaction,
        styles: paypalHostedFieldsStyle,
        fields: {
          number: {
            selector: '#cardNumber',
            placeholder: '1111 1111 1111 1111',
          },
          cvv: {
            selector: '#cvv',
            placeholder: '111',
          },
          expirationDate: {
            selector: '#cardExpiry',
            placeholder: 'MM/YY',
          },
        },
      });
      setAdvancedCardsInstance(instance);
    }
  }, [supportsAdvancedCards, getPaypalUserToken, createPaypalTransaction, dispatch, options]);

  useEffect(() => {
    if (paypal?.advancedCards) {
      if (isResolved) {
        setSupportsAdvancedCards(window.paypal.HostedFields?.isEligible());
      }
    }
  }, [setSupportsAdvancedCards, options, isResolved, paypal?.advancedCards]);

  useEffect(() => {
    if (paypal?.advancedCards) {
      if (!loadedAdvancedCards) {
        initHostedFields();
      }
    }
  }, [initHostedFields, loadedAdvancedCards, paypal?.advancedCards]);

  const capturePaypalTransaction = async (captureCheckoutData: CheckoutData) => {
    console.log(captureCheckoutData);
    if (!captureCheckoutData.paypalPayload?.orderId) {
      onErrorPaypalTransaction(new Error(), true);
      return;
    }
    await capturePTransactionMW(
      isLogged() ? token : '', 
      intl.locale, 
      captureCheckoutData,
      !isLogged() ? user : undefined,
      !isLogged() ? cart : undefined
    ).then((_response: { paypalTransactionId: string }) => {
      onCompleteTransaction();
    }).catch((error) => {
      onErrorPaypalTransaction(error, true);
    });
  };

  const onCompleteTransaction = async () => {
    router.push(pages.home.path);
    cleanCart();
    setSuccessMsg(intl.formatMessage({ id: 'checkout.successes.createTransaction'}));
    enqueueSnackbar(intl.formatMessage(
      { id: 'checkout.successes.createOrder' }), 
      { variant: 'success', autoHideDuration: snachbarDuration }
    );
  };

  return {
    onPaypalButtonsSubmit,
    onPaypalButtonsApprove,
    onPaypalButtonsError,
    onAdvancedCardsSubmit,
    advancedCardsInstance,
    cardHolderNameFieldValue,
    handleCardHolderNameField,
    rememberFieldValue,
    handleRememberField,
    errorMsg,
    successMsg,
  };
};

export default usePaypal;
