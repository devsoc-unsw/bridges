import dotenv from 'dotenv';
import type { NextConfig } from 'next';

dotenv.config({ path: '../env/client.env' });

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
  },
};

export default nextConfig;
