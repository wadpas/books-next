import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  images: {
    domains: ['nbtnpxas3dbkrjhb.public.blob.vercel-storage.com'],
  },
}

export default nextConfig
