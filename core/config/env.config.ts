const envConfig = {
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'EcommerceVC',
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000/api',
  NEXT_PUBLIC_EMAIL: process.env.NEXT_PUBLIC_EMAIL || 'info@gmail.com',
  NEXT_PUBLIC_CONFIRMATION_TOKEN_EXPIRY: process.env.NEXT_PUBLIC_CONFIRMATION_TOKEN_EXPIRY || '30 mins',
};

export default envConfig;
