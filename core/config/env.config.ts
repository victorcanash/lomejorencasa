import { Environments } from '@core/constants/app';

const envConfig = {
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'EcommerceVC',
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV as Environments == Environments.production ? Environments.production : Environments.development,
  NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000/api',
  NEXT_PUBLIC_EMAIL: process.env.NEXT_PUBLIC_EMAIL || 'info@gmail.com',
  NEXT_PUBLIC_CONFIRMATION_TOKEN_EXPIRY: process.env.NEXT_PUBLIC_CONFIRMATION_TOKEN_EXPIRY || '30 mins',
  NEXT_PUBLIC_PAYPAL_ADVANCED_CARDS: process.env.NEXT_PUBLIC_PAYPAL_ADVANCED_CARDS || 'enabled',
  NEXT_PUBLIC_GOOGLE_AM_ID: process.env.NEXT_PUBLIC_GOOGLE_AM_ID || '',
  NEXT_PUBLIC_GOOGLE_GTM_ID: process.env.NEXT_PUBLIC_GOOGLE_GTM_ID || '',
};

export default envConfig;
