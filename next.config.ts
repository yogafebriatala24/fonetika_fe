import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["fenotika.nusacitateknologi.com"], // Tambahkan hostname di sini
  },
  eslint: {
    dirs: ["src"],
  },
};

export default nextConfig;
