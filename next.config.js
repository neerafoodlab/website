/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['img.youtube.com', 'i.ytimg.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion']
  },
  // Handle admin route for NetlifyCMS
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html'
      }
    ]
  }
}

module.exports = nextConfig
