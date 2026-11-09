import type { NextConfig } from "next";

// Fully static build (`out/`): deploy to Netlify or Cloudflare Pages, no server needed.
// Security headers live in public/_headers (understood by both hosts).
const nextConfig: NextConfig = {
  output: "export",
  poweredByHeader: false,
  reactStrictMode: true,
  turbopack: {
    rules: {
      "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" },
    },
  },
  images: { unoptimized: true },
};

export default nextConfig;
