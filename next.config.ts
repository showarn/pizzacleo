import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true, // 301 redirect, bra för SEO
      },
    ];
  },
};

export default nextConfig;
