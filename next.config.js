/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export for production builds
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    trailingSlash: true,
    images: {
      unoptimized: true
    }
  }),
  // Development images configuration
  ...(process.env.NODE_ENV === 'development' && {
    images: {
      domains: ['img.youtube.com', 'i.ytimg.com']
    }
  }),
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
