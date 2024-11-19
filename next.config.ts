/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prevent double render on dev mode, which causes 2 frames to exist
  reactStrictMode: false,
  images: {
    minimumCacheTTL: 1, // To allow dynamic images in case you are previewing them using next/image
    remotePatterns: [
      {
        hostname: "*",
        protocol: "http",
      },
      {
        hostname: "*",
        protocol: "https",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*", // Apply to all paths
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' *", // Allow iframe embedding
          },
          {
            key: "X-Frame-Options",
            value: "", // Remove the header or explicitly set it to allow
          },
        ],
      },
    ];
  },
};

export default nextConfig;
