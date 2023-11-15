import { useRef, useState, useEffect, type ChangeEvent, useCallback } from 'react'
import { useRouter } from 'next/router'

import { useIntl } from 'react-intl'
import { type FormikProps } from 'formik'
import { useSnackbar } from 'notistack'
import {
  type CreateOrderData,
  type CreateOrderActions,
  type OnApproveData,
  type OnApproveActions,
  type HostedFieldsHandler
} from '@paypal/paypal-js'
import { usePayPalScriptReducer } from '@paypal/react-paypal-js'

import type { CheckoutData, CheckoutContact } from '@core/types/checkout'
import type { GuestUser, User } from '@core/types/user'
import {
  // getPaypalUserToken as getPaypalUserTokenMW,
  createPaypalTransaction as createPTransactionMW,
  capturePaypalTransaction as capturePTransactionMW
} from '@core/utils/payments'
import { getBackendErrorMsg, logBackendError } from '@core/utils/errors'
import { getCountryCode } from '@core/utils/addresses'
import { reinitFBEvents } from '@core/utils/facebook'

import { pages } from '@lib/config/navigation.config'
import { paypalHostedFieldsStyle } from '@lib/config/theme/elements'
import snackbarConfig from '@lib/config/snackbar.config'
import { useAppContext } from '@core/contexts/AppContext'
import { useAuthContext } from '@core/contexts/AuthContext'
import { useCartContext } from '@core/contexts/CartContext'
import useFacebook from '@core/hooks/useFacebook'

const usePayments = () => {
  const { setLoading } = useAppContext()
  const {
    token,
    user,
    setUser,
    currency,
    checkoutData,
    setCheckoutData,
    isLogged,
    paypal
  } = useAuthContext()
  const { cart, cleanCart, totalPrice, totalQuantity } = useCartContext()

  const router = useRouter()
  const intl = useIntl()
  const { enqueueSnackbar } = useSnackbar()
  const [{ isResolved, options }] = usePayPalScriptReducer()

  const {
    sendInitiateCheckoutEvent,
    sendAddPaymentInfoEvent,
    sendPurchaseEvent
  } = useFacebook()

  const contactFormRef = useRef<FormikProps<CheckoutContact> | null>(null)

  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [advancedCardsInstance, setAdvancedCardsInstance] = useState<HostedFieldsHandler | undefined>(undefined)
  const [supportsAdvancedCards, setSupportsAdvancedCards] = useState<boolean | undefined>(undefined)
  const [rememberFieldValue, setRememberFieldValue] = useState(false)
  const [cardHolderNameFieldValue, setCardHolderNameFieldValue] = useState(checkoutData?.card?.holderName ?? '')

  const paypalButtonsDependencies: unknown[] = [
    intl.locale,
    checkoutData,
    token,
    user,
    isLogged,
    cart,
    totalPrice,
    totalQuantity
  ]

  const handleRememberField = (_event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setRememberFieldValue(checked)
  }
  const handleCardHolderNameField = (event: ChangeEvent<HTMLInputElement>) => {
    setCardHolderNameFieldValue(event.target.value)
  }

  const getNewData = useCallback(() => {
    const contactFormValues: CheckoutContact = contactFormRef.current?.values ?? {}
    const newCheckoutData: CheckoutData = {
      ...checkoutData,
      ...contactFormValues
    }
    const newUser: User | GuestUser = isLogged()
      ? {
          ...user,
          shipping: contactFormValues.shipping,
          billing: contactFormValues.billing
        }
      : {
          ...user,
          email: contactFormValues.checkoutEmail
        }
    return {
      newCheckoutData,
      newUser
    }
  }, [checkoutData, isLogged, user])

  const onPaypalButtonsSubmit = async (_data: CreateOrderData, _actions: CreateOrderActions) => {
    return await createPaypalTransaction()
  }

  const onPaypalButtonsApprove = async (data: OnApproveData, _actions: OnApproveActions) => {
    const { newUser, newCheckoutData } = getNewData()
    const captureCheckoutData: CheckoutData = {
      ...newCheckoutData,
      orderId: data.orderID,
      remember: rememberFieldValue
    }
    setCheckoutData(captureCheckoutData)
    setUser(newUser, false)
    onSuccessPaypalTransaction(captureCheckoutData)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPaypalButtonsError = (error: any) => {
    onErrorPaypalTransaction(error)
  }

  const onAdvancedCardsSubmit = async () => {
    if (advancedCardsInstance == null) {
      onErrorPaypalTransaction(new Error())
      return
    }
    if (cardHolderNameFieldValue.length < 1) {
      onErrorPaypalTransaction(new Error('cardHolderName'))
      return
    }
    const contactFormValues: CheckoutContact = contactFormRef.current?.values ?? {}
    advancedCardsInstance
      .submit({
        cardholderName: cardHolderNameFieldValue,
        billingAddress: {
          streetAddress: contactFormValues.billing?.addressLine1,
          extendedAddress: contactFormValues.billing?.addressLine2,
          region: contactFormValues.billing?.country,
          locality: contactFormValues.billing?.locality,
          postalCode: contactFormValues.billing?.postalCode,
          countryCodeAlpha2: ((contactFormValues.billing?.country) != null) ? getCountryCode(contactFormValues.billing?.country) : undefined
        },
        contingencies: ['SCA_WHEN_REQUIRED']
      }).then((response) => {
        setLoading(true)
        const { newUser, newCheckoutData } = getNewData()
        const captureCheckoutData: CheckoutData = {
          ...newCheckoutData,
          orderId: response.orderId,
          card: {
            type: response.card?.brand,
            lastFour: response.card?.last_digits,
            holderName: cardHolderNameFieldValue
          },
          remember: rememberFieldValue
        }
        setCheckoutData(captureCheckoutData)
        setUser(newUser, false)
        if ((response.liabilityShift != null) && response.liabilityShift !== 'POSSIBLE') {
          onErrorPaypalTransaction(new Error('3dSecure'))
          return
        }
        onSuccessPaypalTransaction(captureCheckoutData)
      }).catch(async (error: Error) => {
        await initHostedFields()
        onErrorPaypalTransaction(error)
      })
  }

  /* const getPaypalUserToken = useCallback(async () => {
    let paypalUserToken: string | undefined
    if (!isLogged()) {
      return paypalUserToken
    }
    setLoading(true)
    setErrorMsg('')
    setSuccessMsg('')
    await getPaypalUserTokenMW(token, intl.locale)
      .then((response: { paypalUserToken: string }) => {
        paypalUserToken = response.paypalUserToken
      }).catch((_error) => {
      })
    setLoading(false)
    return paypalUserToken
  }, [intl.locale, isLogged, setLoading, token]) */

  const createPaypalTransaction = useCallback(async () => {
    return await new Promise<string>((resolve, reject) => {
      setLoading(true)
      setErrorMsg('')
      setSuccessMsg('')
      if (!((contactFormRef.current?.isValid) ?? false)) {
        reject(new Error('contactForm'))
        return
      }
      const { newCheckoutData } = getNewData()
      reinitFBEvents(newCheckoutData, router.locale)
      sendInitiateCheckoutEvent()
      createPTransactionMW(
        isLogged() ? token : '',
        intl.locale,
        currency,
        newCheckoutData,
        !isLogged() ? cart : undefined
      )
        .then((response: { paypalTransactionId: string }) => {
          setLoading(false)
          resolve(response.paypalTransactionId)
        }).catch((error) => {
          const errorMsg = error.message
          reject(new Error(errorMsg))
        })
    })
  }, [cart, currency, getNewData, intl.locale, isLogged, router.locale, sendInitiateCheckoutEvent, setLoading, token])

  const onSuccessPaypalTransaction = (captureCheckoutData: CheckoutData) => {
    void capturePaypalTransaction(captureCheckoutData)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onErrorPaypalTransaction = (error: any) => {
    setLoading(false)
    setSuccessMsg('')
    if (error.message?.includes('Detected popup close') === true) {
      setErrorMsg('')
    } else if (error.message?.includes('contactForm') === true) {
      setErrorMsg(intl.formatMessage({ id: 'checkout.errors.contactForm' }))
    } else if (error.message?.includes('The email entered belongs to a registered user') === true) {
      setErrorMsg(intl.formatMessage({ id: 'checkout.errors.registeredUser' }))
    } else if (error.message?.includes('cardHolderName') === true) {
      setErrorMsg(intl.formatMessage({ id: 'checkout.errors.cardFieldsHolderName' }))
    } else if (error.details != null && error.details.length > 0 && error.details[0].field != null) {
      const errorDetail = error.details[0].field as string
      if (errorDetail.includes('card/number')) {
        setErrorMsg(intl.formatMessage({ id: 'checkout.errors.cardFieldsNumber' }))
      } else if (errorDetail.includes('card/cvv')) {
        setErrorMsg(intl.formatMessage({ id: 'checkout.errors.cardFieldsCVV' }))
      } else if (errorDetail.includes('card/expiry')) {
        setErrorMsg(intl.formatMessage({ id: 'checkout.errors.cardFieldsExpiry' }))
      }
    } else if (error.message?.includes('3dSecure') === true) {
      setErrorMsg(intl.formatMessage({ id: 'checkout.errors.cardFields3dSecure' }))
    } else if (error.message?.includes('Insufficient Funds') === true) {
      setErrorMsg(intl.formatMessage({ id: 'checkout.errors.insufficientFunds' }))
    } else {
      setErrorMsg(intl.formatMessage({ id: 'checkout.errors.default' }))
    }
  }

  const initHostedFields = useCallback(async () => {
    try {
      if (typeof supportsAdvancedCards === 'boolean' && !!supportsAdvancedCards) {
        /* await getPaypalUserToken().then((paypalUserToken?: string) => {
          if (paypalUserToken) {
            dispatch({
              type: 'resetOptions',
              value: {
                  ...options,
                  'data-user-id-token': paypalUserToken,
              },
            });
          }
        }); */
        if (advancedCardsInstance != null) {
          await advancedCardsInstance.teardown()
        }
        const instance = await window.paypal?.HostedFields?.render({
          createOrder: createPaypalTransaction,
          styles: paypalHostedFieldsStyle,
          fields: {
            number: {
              selector: '#cardNumber',
              placeholder: '1111 1111 1111 1111'
            },
            cvv: {
              selector: '#cvv',
              placeholder: '111'
            },
            expirationDate: {
              selector: '#cardExpiry',
              placeholder: 'MM/YY'
            }
          }
        })
        setAdvancedCardsInstance(instance)
      }
    } catch (error) {
      const errorMsg = getBackendErrorMsg('SDK PaypalHostedFields ERROR', error)
      logBackendError(errorMsg)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createPaypalTransaction, supportsAdvancedCards])

  useEffect(() => {
    if ((paypal?.advancedCards) === true) {
      if (isResolved) {
        setSupportsAdvancedCards(window.paypal?.HostedFields?.isEligible())
      }
    }
  }, [setSupportsAdvancedCards, options, isResolved, paypal?.advancedCards])

  useEffect(() => {
    if ((paypal?.advancedCards) === true) {
      void initHostedFields()
    }
  }, [initHostedFields, paypal?.advancedCards])

  const capturePaypalTransaction = async (captureCheckoutData: CheckoutData) => {
    if (captureCheckoutData.orderId === '') {
      onErrorPaypalTransaction(new Error())
      return
    }
    setLoading(true)
    setErrorMsg('')
    setSuccessMsg('')
    sendAddPaymentInfoEvent()
    await capturePTransactionMW(
      isLogged() ? token : '',
      intl.locale,
      currency,
      captureCheckoutData,
      !isLogged() ? cart : undefined
    ).then((_response: { paypalTransactionId: string }) => {
      onCompleteTransaction(captureCheckoutData)
    }).catch((error) => {
      onErrorPaypalTransaction(error)
    })
  }

  const onCompleteTransaction = (_captureCheckoutData: CheckoutData) => {
    void router.push(pages.home.path)
    sendPurchaseEvent()
    cleanCart()
    setSuccessMsg(intl.formatMessage({ id: 'checkout.successes.message' }))
    enqueueSnackbar(intl.formatMessage(
      { id: 'checkout.successes.snackbar' }),
    { variant: 'success', autoHideDuration: snackbarConfig.durations.long }
    )
  }

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
    successMsg
  }
}

export default usePayments
