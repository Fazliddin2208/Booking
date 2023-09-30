/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname:'localhost',
        },
        {
          protocol: 'http',
          hostname:'127.0.0.1',
        },
      ],
      minimumCacheTTL: 1500000
    },
  }
  
  module.exports = nextConfig
