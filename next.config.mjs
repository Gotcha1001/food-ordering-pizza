import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "food-ordering-pizzas.s3.amazonaws.com", // Allow S3 images
      },
    ],
  },
};

export default nextConfig;
