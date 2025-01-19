import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fenotika.nusacitateknologi.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        pathname: "**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "date-fns",
      "date-fns-tz",
      "react-icons",
    ],
  },
  eslint: {
    dirs: ["src"],
  },
};
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
