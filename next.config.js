/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/scep', destination: '/scep/index.html' },
      { source: '/scep/:path*', destination: '/scep/:path*' },
      { source: '/scl', destination: '/scl/index.html' },
      { source: '/scl/:path*', destination: '/scl/:path*' },
      { source: '/scp', destination: '/scp/index.html' },
      { source: '/scp/:path*', destination: '/scp/:path*' },
      { source: '/lip', destination: '/lip/index.html' },
      { source: '/lip/:path*', destination: '/lip/:path*' },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: process.env.FRONTEND_URL || '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
