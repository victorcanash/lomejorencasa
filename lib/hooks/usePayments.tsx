import { useRef, useState, useEffect, ChangeEvent, useCallback } from 'react';
import { useRouter } from 'next/router';

import { useIntl } from 'react-intl';
import { FormikProps } from 'formik';
import { useSnackbar } from 'notistack';
import { 
  CreateOrderData, 
  CreateOrderActions, 
  OnApproveData, 
  OnApproveActions, 
  HostedFieldsHandler,
} from '@paypal/paypal-js';
import { usePayPalScriptReducer } from '@paypal/react-paypal-js';

import type { CheckoutData, CheckoutContact } from '@core/types/checkout';
import type { GuestUser, User } from '@core/types/user';
import { 
  getPaypalUserToken as getPaypalUserTokenMW,
  createPaypalTransaction as createPTransactionMW,
  capturePaypalTransaction as capturePTransactionMW,
} from '@core/utils/payments';
import { getBackendErrorMsg, logBackendError } from '@core/utils/errors';
import { getCountryCode } from '@core/utils/addresses';

import { pages } from '@lib/constants/navigation';
import { paypalHostedFieldsStyle } from '@lib/constants/themes/elements';
import snackbarConfig from '@lib/constants/snackbar';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { useCartContext } from '@lib/contexts/CartContext';

const usePayments = () => {
  const { setLoading } = useAppContext();
  const {
    token,
    user,
    setUser,
    currency,
    checkoutData,
    setCheckoutData,
    isLogged,
    paypal,
  } = useAuthContext();
  const { cart, cleanCart, totalPrice, totalQuantity } = useCartContext();

  const router = useRouter();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const [{ isResolved, options }, dispatch] = usePayPalScriptReducer();

  const contactFormRef = useRef<FormikProps<CheckoutContact> | null>(null);

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [advancedCardsInstance, setAdvancedCardsInstance] = useState<HostedFieldsHandler | undefined>(undefined);
  const [supportsAdvancedCards, setSupportsAdvancedCards] = useState<boolean | undefined>(undefined);
  const [rememberFieldValue, setRememberFieldValue] = useState(false);
  const [cardHolderNameFieldValue, setCardHolderNameFieldValue] = useState(checkoutData?.card?.holderName || '');

  const paypalButtonsDependencies: Array<unknown> = [
    intl.locale,
    checkoutData,
    token,
    user,
    isLogged,
    cart,
    totalPrice,
    totalQuantity
  ];

  const handleRememberField = (_event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setRememberFieldValue(checked);
  };
  const handleCardHolderNameField = (event: ChangeEvent<HTMLInputElement>) => {
    setCardHolderNameFieldValue(event.target.value);
  };

  const getNewData = useCallback(() => {
    const contactFormValues = contactFormRef.current?.values || {} as CheckoutContact;
    const newCheckoutData: CheckoutData = {
      ...checkoutData,
      ...contactFormValues,
    };
    const newUser = isLogged() ? {
      ...user,
      shipping: contactFormValues.shipping,
      billing: contactFormValues.billing,
    } as User : {
      ...user,
      email: contactFormValues.checkoutEmail,
    } as GuestUser;
    return {
      newCheckoutData,
      newUser,
    };
  }, [checkoutData, isLogged, user]);

  const onPaypalButtonsSubmit = async (_data: CreateOrderData, _actions: CreateOrderActions) => {
    return createPaypalTransaction();
  };

  const onPaypalButtonsApprove = async (data: OnApproveData, _actions: OnApproveActions) => {
    const { newUser, newCheckoutData } = getNewData();
    const captureCheckoutData: CheckoutData = {
      ...newCheckoutData,
      orderId: data.orderID,
      remember: rememberFieldValue,
    };
    setCheckoutData(captureCheckoutData);
    setUser(newUser);
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
      onErrorPaypalTransaction(new Error('cardHolderName'));
      return;
    }
    const contactFormValues = contactFormRef.current?.values || {} as CheckoutContact;
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
        setLoading(true);
        const { newUser, newCheckoutData } = getNewData();
        const captureCheckoutData: CheckoutData = {
          ...newCheckoutData,
          orderId: response.orderId,
          card: {
            type: response.card?.brand,
            lastFour: response.card?.last_digits,
            holderName: cardHolderNameFieldValue,
          },
          remember: rememberFieldValue,
        };
        setCheckoutData(captureCheckoutData);
        setUser(newUser);
        if (response.liabilityShift && response.liabilityShift !== 'POSSIBLE') {
          onErrorPaypalTransaction(new Error('3dSecure'));
          return;
        }
        onSuccessPaypalTransaction(captureCheckoutData);
      }).catch(async (error: Error) => {
        await initHostedFields();
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
        paypalUserToken = response.paypalUserToken;
      }).catch((_error) => {
      })
    setLoading(false);
    return paypalUserToken;
  }, [intl.locale, isLogged, setLoading, token]);

  const createPaypalTransaction = useCallback(async () => {
    return new Promise<string>(async (resolve, reject) => {
      setLoading(true);
      setErrorMsg('');
      setSuccessMsg('');
      if (!contactFormRef.current?.isValid) {
        reject(new Error('contactForm'));
        return;
      }
      const { newCheckoutData } = getNewData();
      await createPTransactionMW(
          isLogged() ? token : '', 
          intl.locale,
          currency,
          newCheckoutData,
          !isLogged() ? cart : undefined
        )
          .then((response: { paypalTransactionId: string }) => {
            setLoading(false);
            resolve(response.paypalTransactionId);
          }).catch((error) => {
            const errorMsg = error.message;
            reject(new Error(errorMsg))
          });
    });
  }, [cart, currency, getNewData, intl.locale, isLogged, setLoading, token]);

  const onSuccessPaypalTransaction = (captureCheckoutData: CheckoutData) => {
    capturePaypalTransaction(captureCheckoutData);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onErrorPaypalTransaction = (error: any) => {
    setLoading(false);
    setSuccessMsg('');
    if (error.message && error.message.includes('Detected popup close')) {
      setErrorMsg('');
    } else if (error.message && error.message.includes('contactForm')) {
      setErrorMsg(intl.formatMessage({ id: 'checkout.errors.contactForm' }));
    } else if (error.message && error.message.includes('The email entered belongs to a registered user')) {
      setErrorMsg(intl.formatMessage({ id: 'checkout.errors.registeredUser' }));
    } else if (error.message && error.message.includes('cardHolderName')) {
      setErrorMsg(intl.formatMessage({ id: 'checkout.errors.cardFieldsHolderName' }));
    } else if (error.details && error.details.length > 0 && error.details[0].field) {
      const errorDetail = error.details[0].field as string;
      if (errorDetail.includes('card/number')) {
        setErrorMsg(intl.formatMessage({ id: 'checkout.errors.cardFieldsNumber' }));
      } else if (errorDetail.includes('card/cvv')) {
        setErrorMsg(intl.formatMessage({ id: 'checkout.errors.cardFieldsCVV' }));
      } else if (errorDetail.includes('card/expiry')) {
        setErrorMsg(intl.formatMessage({ id: 'checkout.errors.cardFieldsExpiry' }));
      }
    } else if (error.message && error.message.includes('3dSecure')) {
      setErrorMsg(intl.formatMessage({ id: 'checkout.errors.cardFields3dSecure' }));
    } else if (error.message && error.message.includes('Insufficient Funds')) {
      setErrorMsg(intl.formatMessage({ id: 'checkout.errors.insufficientFunds' }));
    } else {
      setErrorMsg(intl.formatMessage({ id: 'checkout.errors.default' }));
    }
  };

  const initHostedFields = useCallback(async () => {
    try {
      if (typeof supportsAdvancedCards === 'boolean' && !!supportsAdvancedCards) {
        /*await getPaypalUserToken().then((paypalUserToken?: string) => { 
          if (paypalUserToken) {
            dispatch({
              type: 'resetOptions',
              value: {
                  ...options,
                  'data-user-id-token': paypalUserToken,
              },
            });
          }
        });*/
        if (advancedCardsInstance) {
          await advancedCardsInstance.teardown();
        }
        const instance = await window.paypal?.HostedFields?.render({
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
    } catch (error) {
      const errorMsg = getBackendErrorMsg('SDK PaypalHostedFields ERROR', error);
      logBackendError(errorMsg);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createPaypalTransaction, supportsAdvancedCards]);

  useEffect(() => {
    if (paypal?.advancedCards) {
      if (isResolved) {
        setSupportsAdvancedCards(window.paypal?.HostedFields?.isEligible());
      }
    }
  }, [setSupportsAdvancedCards, options, isResolved, paypal?.advancedCards]);

  useEffect(() => {
    if (paypal?.advancedCards) {
      initHostedFields();
    }
  }, [initHostedFields, paypal?.advancedCards]);

  const capturePaypalTransaction = async (captureCheckoutData: CheckoutData) => {
    if (!captureCheckoutData?.orderId) {
      onErrorPaypalTransaction(new Error());
      return;
    }
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    await capturePTransactionMW(
      isLogged() ? token : '', 
      intl.locale, 
      captureCheckoutData,
      !isLogged() ? cart : undefined
    ).then((_response: { paypalTransactionId: string }) => {
      onCompleteTransaction();
    }).catch((error) => {
      onErrorPaypalTransaction(error);
    });
  };

  const onCompleteTransaction = () => {
    router.push(pages.home.path);
    cleanCart();
    setSuccessMsg(intl.formatMessage({ id: 'checkout.successes.message'}));
    enqueueSnackbar(intl.formatMessage(
      { id: 'checkout.successes.snackbar' }), 
      { variant: 'success', autoHideDuration: snackbarConfig.durations.long }
    );
  };

  return {
    contactFormRef,
    paypalButtonsDependencies,
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

export default usePayments;
