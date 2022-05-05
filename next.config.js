/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    domains: [`pple-prod-images.s3.ap-northeast-2.amazonaws.com`],
    formats: ["image/webp"],
  },
};

module.exports = nextConfig;
