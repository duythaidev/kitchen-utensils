import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || '',
    BACKEND_API: process.env.BACKEND_API || 'http://localhost:8080',
  },
  images: {
    domains: ['www.tefal.com.au', 'upload.wikimedia.org', 'lh3.googleusercontent.com', 'placehold.jp'],
  },
};

export default nextConfig;
