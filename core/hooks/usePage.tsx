import { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/router'

import { useIntl } from 'react-intl'

import { init, isAdminUser } from '@core/utils/auth'

import { pages } from '@lib/config/navigation.config'
import { useAppContext } from '@core/contexts/AppContext'
import { useCartContext } from '@core/contexts/CartContext'
import { useAuthContext } from '@core/contexts/AuthContext'

const usePage = (setLoaded = true) => {
  const { initialized, setInitialized, setLoading } = useAppContext()
  const { initCart } = useCartContext()
  const {
    token,
    setToken,
    setUser,
    setPaypal,
    isLogged,
    isProtectedPath,
    isAdminPath,
    getRedirectProtectedPath
  } = useAuthContext()

  const router = useRouter()
  const intl = useIntl()

  const firstRenderRef = useRef(false)
  const [checked, setChecked] = useState(false)

  const initData = useCallback(async () => {
    await init(
      intl.locale
    ).then(async (response) => {
      initCart(response.cart)
      if ((response.token != null) && (response.user != null)) {
        setToken(response.token)
        setUser(response.user)
      }
      setPaypal(response.paypal)
      setInitialized(true)
    }).catch((_error: Error) => {
      // throw error;
    })
  }, [initCart, intl.locale, setInitialized, setPaypal, setToken, setUser])

  const onCheckSuccess = useCallback(() => {
    if (setLoaded) {
      setLoading(false)
    }
    setChecked(true)
  }, [setLoaded, setLoading])

  const checkPage = useCallback(async () => {
    if (isProtectedPath() && !isLogged()) {
      void router.push(getRedirectProtectedPath())
    } else if (isAdminPath()) {
      await isAdminUser(token).then((response: boolean) => {
        if (!response) {
          void router.push(pages.home.path)
        } else {
          onCheckSuccess()
        }
      }).catch((_error: Error) => {
        void router.push(pages.home.path)
      })
    } else {
      onCheckSuccess()
    }
  }, [getRedirectProtectedPath, isAdminPath, isLogged, isProtectedPath, onCheckSuccess, router, token])

  useEffect(() => {
    if (!firstRenderRef.current && !initialized) {
      firstRenderRef.current = true
      void initData()
    }
  }, [initData, initialized])

  useEffect(() => {
    if (initialized) {
      void checkPage()
    }
  }, [initialized, checkPage])

  return {
    checked
  }
}

export default usePage
