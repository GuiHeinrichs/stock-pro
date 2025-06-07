import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  matcher: ["/produtos/api/:path*", "/estoque/api/:path*"],
};

export default nextConfig;
