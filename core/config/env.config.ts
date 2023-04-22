import { Environments } from '@core/constants/app';

const envConfig = {
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'EcommerceVC',
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV as Environments == Environments.production ? 
    Environments.production : Environments.development,
  NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3333/api',
  NEXT_PUBLIC_EMAIL: process.env.NEXT_PUBLIC_EMAIL || 'example@gmail.com',
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
  NEXT_PUBLIC_GOOGLE_AM_ID: process.env.NEXT_PUBLIC_GOOGLE_AM_ID || '',
  NEXT_PUBLIC_GOOGLE_GTM_ID: process.env.NEXT_PUBLIC_GOOGLE_GTM_ID || '',
  NEXT_PUBLIC_FB_PIXEL_ID: process.env.NEXT_PUBLIC_FB_PIXEL_ID || '',
  NEXT_PUBLIC_FB_DEBUG: process.env.NEXT_PUBLIC_FB_DEBUG || 'true',
};

export default envConfig;
