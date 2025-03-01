import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  output: "standalone",
  productionBrowserSourceMaps: false,
  publicRuntimeConfig: {
    NEXT_PUBLIC_API_URL: process.env.API_URL,
  },
  images: {
    domains: ["localhost", "13.36.149.122", "cms.upskillsconsulting.com"],
  },
};

export default nextConfig;
