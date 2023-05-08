/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost', 
      'ecommerce-vc-api-eqhxa.ondigitalocean.app',
      'www.facebook.com',
    ],
  },
  i18n: {
    locales: ['es'],
    defaultLocale: 'es',
    localeDetection: false,
  },
};

export default nextConfig;
