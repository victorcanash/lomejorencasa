/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost', 
      'ecommerce-vc-api-eqhxa.ondigitalocean.app',
    ],
  },
};

import withVideos from 'next-videos';

export default withVideos(nextConfig);
