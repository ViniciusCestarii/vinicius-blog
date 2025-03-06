/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'standalone',
  devIndicators: false,
  experimental: {
    viewTransition: true,
  },
  images: {
    domains: ['api.microlink.io'],
  },
}

export default nextConfig
