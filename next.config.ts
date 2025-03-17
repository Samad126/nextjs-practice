import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.dummyjson.com"],
  },

  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/products",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
