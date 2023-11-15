import { useState, useEffect, useCallback } from 'react'

import { useRouter } from 'next/router'

import { isAdminUser } from '@core/utils/auth'

import { pages } from '@lib/config/navigation.config'
import { useAppContext } from '@core/contexts/AppContext'
import { useCartContext } from '@core/contexts/CartContext'
import { useAuthContext } from '@core/contexts/AuthContext'
import CheckoutForms from '@core/components/forms/checkout'

interface CheckoutProps {
  pageChecked: boolean
}

const Checkout = (props: CheckoutProps) => {
  const {
    pageChecked
  } = props

  const { setLoading } = useAppContext()
  const { disabledCheckoutPage } = useCartContext()
  const { token, paypal } = useAuthContext()

  const router = useRouter()

  const [loadedCheckout, setLoadedCheckout] = useState(!disabledCheckoutPage())

  const init = useCallback(async () => {
    if (disabledCheckoutPage()) {
      let isAdmin = false
      await isAdminUser(token).then((response: boolean) => {
        isAdmin = response
      }).catch((_error) => {})
      if (!isAdmin) {
        void router.push(pages.home.path)
        return
      }
    }
    setLoadedCheckout(true)
    setLoading(false)
  }, [disabledCheckoutPage, router, setLoading, token])

  useEffect(() => {
    if (pageChecked) {
      void init()
    }
  }, [init, pageChecked])

  return (
    <>
      { (loadedCheckout && (paypal != null)) &&
        <CheckoutForms />
      }
    </>
  )
}

export default Checkout
