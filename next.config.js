// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',            // must match your <Image> URL
        hostname: 'backend.thetopmasters.com',
        port: '',                     // default
        pathname: '/**',              // allow all paths under /storage/…
      },
      {
        protocol: 'https',
        hostname: 'anotherdomain.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'enquiries.estate',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',             // if you ever serve from localhost over http
        hostname: '127.0.0.1',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'd3h330vgpwpjr8.cloudfront.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig