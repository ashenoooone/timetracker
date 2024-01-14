/** @type {import('next').NextConfig} */

const api_url = "https://localhost:3000/";

const nextConfig = {
  reactStrictMode: true,
  env: {
    API: api_url,
  },
};

module.exports = nextConfig;
