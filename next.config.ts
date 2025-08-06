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
    ],
  },
};

export default nextConfig;
