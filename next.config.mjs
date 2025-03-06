/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'standalone',
  devIndicators: false,
  images: {
    domains: ['api.microlink.io'],
  },
}

export default nextConfig
