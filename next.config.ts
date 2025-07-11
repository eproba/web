import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  cacheOnNavigation: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV !== "production",
});

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

export default withSerwist(nextConfig);
