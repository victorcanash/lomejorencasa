import {
  createContext,
  useContext,
  useCallback,
  useState,
  useRef,
  useEffect,
  type Dispatch,
  type SetStateAction,
  type MutableRefObject
} from 'react'
import { useRouter } from 'next/router'

import { getCookie } from 'cookies-next'

import { ConsentKey, ConsentValues } from '@core/constants/cookies'
import { Protections } from '@core/constants/auth'
import type { PaypalCredentials } from '@core/types/payment'
import type { User, GuestUser } from '@core/types/user'
import type { CheckoutData } from '@core/types/checkout'
import { reinitFBEvents } from '@core/utils/facebook'

import { pages, originRedirects } from '@lib/config/navigation.config'
import { instanceOfUser } from '@core/utils/user'

interface ContextType {
  token: string
  setToken: Dispatch<SetStateAction<string>>
  paypal?: PaypalCredentials
  setPaypal: Dispatch<SetStateAction<PaypalCredentials | undefined>>
  user: User | GuestUser
  setUser: (user: User | GuestUser, reloadFBEvents?: boolean) => void
  currency: string
  checkoutData: CheckoutData
  setCheckoutData: Dispatch<SetStateAction<CheckoutData>>
  removeUser: () => void
  prevLoginPath?: string
  isLogged: () => boolean
  isProtectedPath: () => boolean
  isAdminPath: () => boolean
  getRedirectProtectedPath: () => string
  getRedirectLogoutPath: () => string | undefined
  convertPriceToString: (price: number) => string
  enabledRegisterBanner: MutableRefObject<boolean>
}

export const AuthContext = createContext<ContextType>({
  token: '',
  setToken: () => {},
  paypal: undefined,
  setPaypal: () => {},
  user: {},
  setUser: () => {},
  currency: '',
  checkoutData: { orderId: '' },
  setCheckoutData: () => {},
  removeUser: () => {},
  prevLoginPath: undefined,
  isLogged: () => false,
  isProtectedPath: () => false,
  isAdminPath: () => false,
  getRedirectProtectedPath: () => '',
  getRedirectLogoutPath: () => undefined,
  convertPriceToString: () => '',
  enabledRegisterBanner: {
    current: false
  }
})

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  const [token, setToken] = useState('')
  const [paypal, setPaypal] = useState<PaypalCredentials | undefined>(undefined)
  const [user, setUser] = useState<User | GuestUser>({})
  const [currency] = useState('EUR')
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({ orderId: '' })
  const prevLoginPathRef = useRef<string | undefined>(undefined)
  const enabledRegisterBanner = useRef(false)

  const updateUser = (user: User | GuestUser, reloadFBEvents = true) => {
    if (reloadFBEvents) {
      reinitFBEvents(user, router.locale)
    }
    setUser(user)
  }

  const removeUser = useCallback(() => {
    const guestUser: GuestUser = {
      email: undefined
    }
    setUser(guestUser)
    setCheckoutData({ orderId: '' })
  }, [])

  const isLogged = useCallback(() => {
    if ((token === '') || !instanceOfUser(user)) {
      return false
    }
    return true
  }, [token, user])

  const isProtectedPath = useCallback(() => {
    for (const [, page] of Object.entries(pages)) {
      if (page.filepath === router.pathname) {
        if (page.protection === Protections.user) {
          return true
        }
        break
      }
    }
    return false
  }, [router.pathname])

  const isAdminPath = useCallback(() => {
    for (const [, page] of Object.entries(pages)) {
      if (page.filepath === router.pathname) {
        if (page.protection === Protections.admin) {
          return true
        }
        break
      }
    }
    return false
  }, [router.pathname])

  const getRedirectProtectedPath = useCallback(() => {
    for (const [, page] of Object.entries(pages)) {
      if (page.filepath === router.pathname) {
        return page.redirectPathOnProtected ?? pages.login.path
      }
    }
    return pages.login.path
  }, [router.pathname])

  const getRedirectLogoutPath = useCallback(() => {
    for (const [, page] of Object.entries(pages)) {
      if (page.filepath === router.pathname) {
        return page.redirectPathOnLogout
      }
    }
    return undefined
  }, [router.pathname])

  const convertPriceToString = useCallback((price: number) => {
    if (currency === 'EUR') {
      return `${price.toFixed(2)}€`
    }
    return `${price.toFixed(2)}$`
  }, [currency])

  const originRedirect = useCallback(() => {
    const origin = location.origin
    for (let i = 0; i < originRedirects.from.length; i++) {
      if (origin.includes(originRedirects.from[i])) {
        void router.push(`${originRedirects.to}${router.asPath}`)
        return true
      }
    }
    return false
  }, [router])

  useEffect(() => {
    if (originRedirect()) {
      return
    }
    Object.entries(pages).forEach(([_key, page]) => {
      if (page.filepath === router.pathname) {
        if (page.savePathOnLogin.enabled) {
          prevLoginPathRef.current = page.savePathOnLogin?.path ?? router.asPath
        }
      }
    })
  }, [originRedirect, router.asPath, router.pathname])

  useEffect(() => {
    if (getCookie(ConsentKey) === ConsentValues.accepted) {
      enabledRegisterBanner.current = true
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        paypal,
        setPaypal,
        user,
        setUser: updateUser,
        currency,
        checkoutData,
        setCheckoutData,
        removeUser,
        prevLoginPath: prevLoginPathRef.current,
        isLogged,
        isProtectedPath,
        isAdminPath,
        getRedirectProtectedPath,
        getRedirectLogoutPath,
        convertPriceToString,
        enabledRegisterBanner
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
