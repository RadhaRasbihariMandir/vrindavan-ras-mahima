import type { NextConfig } from "next";

const isAndroid = process.env.CAP_ANDROID === "1";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.vercel.run"],
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Static export for the Capacitor Android build (CAP_ANDROID=1 npm run build)
  ...(isAndroid ? { output: "export" as const, images: { unoptimized: true }, trailingSlash: true, cacheComponents: false, partialPrefetching: false } : {}),
};

export default nextConfig;
