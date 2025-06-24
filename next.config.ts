import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || ''
  },
  images: {
    domains: ['www.tefal.com.au', 'upload.wikimedia.org'],
  },
};

export default nextConfig;
