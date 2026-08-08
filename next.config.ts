import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — keeps the site deployable to GitHub Pages (as today),
  // and portable to Vercel / Netlify / any CDN without changes.
  output: "export",
  trailingSlash: true,
  images: {
    // Required for `output: "export"` — no server-side image optimisation.
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
