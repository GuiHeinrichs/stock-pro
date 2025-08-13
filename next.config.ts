import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Skip ESLint checks during builds to allow the application to compile
    // even if lint errors are present in the source.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
