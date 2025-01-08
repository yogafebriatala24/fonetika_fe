import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["tangselupdate.nusacitateknologi.com"],
  },
  eslint: {
    dirs: ["src"],
  },
};

export default nextConfig;
