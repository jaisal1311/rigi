/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'commondatastorage.googleapis.com',
      },
    ],
  },
};

export default nextConfig;
