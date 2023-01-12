/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost', 
      'ecommerce-vc-api-eqhxa.ondigitalocean.app',
    ],
  },
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
  },
}

module.exports = nextConfig
