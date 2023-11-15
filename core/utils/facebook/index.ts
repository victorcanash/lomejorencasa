import envConfig from '@core/config/env.config'
import type { FacebookEvent } from '@core/types/facebook'
import type { GuestUser, User } from '@core/types/user'
import type { CheckoutData } from '@core/types/checkout'
import { getCountryCode } from '@core/utils/addresses'

export const reinitFBEvents = (user?: User | GuestUser | CheckoutData, locale?: string) => {
  let birthdate: string | undefined
  if ((user as User)?.birthday != null) {
    const birthdates = new Date((user as User)?.birthday ?? '').toLocaleDateString(locale).split('/').map((birthdate) => {
      if (birthdate.length <= 1) {
        return `0${birthdate}`
      }
      return birthdate
    })
    birthdate = `${birthdates[0]}${birthdates[1]}${birthdates[2]}`
  }
  let city = (user as User | CheckoutData)?.shipping?.locality
  if (city != null) {
    city = city.toLowerCase().replace(/\s+/g, '')
  }
  const countryOption = (user as User | CheckoutData)?.shipping?.country
  let country: string | undefined
  if (countryOption != null) {
    country = getCountryCode(countryOption).toLowerCase()
  }
  const data = {
    em: (user as User | GuestUser)?.email?.toLowerCase() ?? (user as CheckoutData)?.checkoutEmail?.toLowerCase(), // em will be hashed automatically by the pixel using SHA-256
    fn: (user as User)?.firstName?.toLowerCase() ?? (user as CheckoutData)?.shipping?.firstName?.toLowerCase(),
    ln: (user as User)?.lastName?.toLowerCase() ?? (user as CheckoutData)?.shipping?.lastName?.toLowerCase(),
    db: birthdate,
    ct: city,
    st: country,
    zp: (user as User)?.shipping?.postalCode ?? (user as CheckoutData)?.shipping?.postalCode,
    country
  }
  window.fbq('init', envConfig.FB_PIXEL_ID, data)
}

export const consentFBEvents = (consent: boolean) => {
  window.fbq('consent', consent ? 'grant' : 'revoke')
}

export const sendPageViewFBEvent = () => {
  window.fbq('track', 'PageView')
}

export const sendFBEvent = (name: string, data?: FacebookEvent, id?: string) => {
  window.fbq('track', name, data)
}
