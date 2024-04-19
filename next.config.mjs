import million from "million/compiler";
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  images: {
    domains: ["res.cloudinary.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

const millionConfig = {
  auto: true,// if you're using RSC: auto: { rsc: true },
};
export default million.next(nextConfig);
