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
  }
}

export default nextConfig
