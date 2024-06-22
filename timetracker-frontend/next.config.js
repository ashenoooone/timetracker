const api_url = "http://localhost:5000/";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  env: {
    API: api_url,
  },
};

module.exports = nextConfig;
