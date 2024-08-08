/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "openweathermap.org",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/weather/:path*",
        destination: "https://api.openweathermap.org/:path*",
      },
    ];
  },
};

export default nextConfig;
