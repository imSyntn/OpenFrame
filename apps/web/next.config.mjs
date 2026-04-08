import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), "../../.env"),
});

/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: [
    "@workspace/ui",
    "@workspace/types",
    "@workspace/lib",
    "@workspace/constants",
    "@workspace/schema"
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    turbopack: {
      root: path.resolve(process.cwd(), "../../"),
    },
  },
}

export default nextConfig
