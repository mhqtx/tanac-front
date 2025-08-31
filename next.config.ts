import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/tanac-2/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "api.mhqtx.xyz",
        pathname: "/tanac/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
