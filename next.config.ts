import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  images: {
    domains: ['nbtnpxas3dbkrjhb.public.blob.vercel-storage.com', 'static.yakaboo.ua', 'content2.rozetka.com.ua'],
  },
}

export default nextConfig
