/** @type {import('next').NextConfig} */

const api_url = "http://localhost:5000/";

const nextConfig = {
  reactStrictMode: true,
  env: {
    API: api_url,
  },
};

module.exports = nextConfig;
