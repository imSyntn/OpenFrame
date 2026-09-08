import { withSentryConfig } from "@sentry/nextjs";
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@workspace/ui",
    "@workspace/types",
    "@workspace/lib",
    "@workspace/constants",
    "@workspace/schema",
  ],
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "open-frame.t3.tigrisfiles.io",
        pathname: "/**",
      },
    ],
    qualities: [50, 75],
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withSentryConfig(withMDX(nextConfig), {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: process.env.CI,
  widenClientFileUpload: true,
  webpack: {
    automaticVercelMonitors: true,
    treeshake: {
      removeDebugLogging: true,
    },
  },
});
