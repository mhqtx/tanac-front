import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        // port: "80", // ili '3000' ako koristiš taj port
        pathname: "/tanac-2/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "api.mhqtx.xyz/tanac",
        pathname: "/tanac/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
