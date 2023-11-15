import { Environments } from '@core/constants/app'

const envConfig = {
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME ?? 'EcommerceVC',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  APP_ENV: process.env.NEXT_PUBLIC_APP_ENV as Environments === Environments.production
    ? Environments.production
    : Environments.development,
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3333/api',
  EMAIL: process.env.NEXT_PUBLIC_EMAIL ?? 'example@gmail.com',
  CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? '',
  PAYPAL_MERCHANT_ID: process.env.NEXT_PUBLIC_PAYPAL_MERCHANT_ID ?? '',
  PAYPAL_CLIENT_ID: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
  GOOGLE_OAUTH_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID ?? '',
  GTM_ID: process.env.NEXT_PUBLIC_GTM_ID ?? '',
  FB_PIXEL_ID: process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? ''
}

export default envConfig
