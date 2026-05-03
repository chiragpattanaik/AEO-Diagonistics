import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  devIndicators: false,
  async rewrites() {
    return [
      {
        source: "/diagnose",
        destination: process.env.NEXT_PUBLIC_API_URL
          ? `${process.env.NEXT_PUBLIC_API_URL}/diagnose`
          : "http://localhost:8000/diagnose",
      },
    ]
  },
}

export default nextConfig
