/** @type {import('next').NextConfig} */
import createMDX from "@next/mdx";

const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*",
      },
    ],
    unoptimized: true,
  },
  experiments: {
    asyncWebAssembly: true, // Enable async WebAssembly support
    layers: true, // Improve WebAssembly performance
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.wasm$/,
      type: "webassembly/async",
    });
    return config;
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

export default withMDX(nextConfig);