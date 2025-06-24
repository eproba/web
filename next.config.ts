import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    remotePatterns: [
      new URL(
        (process.env.NEXT_PUBLIC_SERVER_URL || "https://eproba.zhr.pl") + "/**",
      ),
      new URL((process.env.INTERNAL_SERVER_URL || "http://nginx") + "/**"),
    ],
  },
};

export default nextConfig;
