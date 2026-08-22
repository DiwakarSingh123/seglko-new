/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Serve static assets (js, css, images) as-is
      { source: '/scep/assets/:path*', destination: '/scep/assets/:path*' },
      { source: '/scl/assets/:path*',  destination: '/scl/assets/:path*'  },
      { source: '/scp/assets/:path*',  destination: '/scp/assets/:path*'  },
      { source: '/lip/assets/:path*',  destination: '/lip/assets/:path*'  },
      // Serve static files (favicon, images, pdfs etc)
      { source: '/scep/:file((?!index\.html).+\.(?:png|jpg|jpeg|svg|ico|pdf|webp|gif|txt|xml|json))', destination: '/scep/:file' },
      { source: '/scl/:file((?!index\.html).+\.(?:png|jpg|jpeg|svg|ico|pdf|webp|gif|txt|xml|json))',  destination: '/scl/:file'  },
      { source: '/scp/:file((?!index\.html).+\.(?:png|jpg|jpeg|svg|ico|pdf|webp|gif|txt|xml|json))',  destination: '/scp/:file'  },
      { source: '/lip/:file((?!index\.html).+\.(?:png|jpg|jpeg|svg|ico|pdf|webp|gif|txt|xml|json))',  destination: '/lip/:file'  },
      // All other routes → serve index.html (React Router handles routing)
      { source: '/scep',       destination: '/scep/index.html' },
      { source: '/scep/:path*', destination: '/scep/index.html' },
      { source: '/scl',        destination: '/scl/index.html'  },
      { source: '/scl/:path*',  destination: '/scl/index.html'  },
      { source: '/scp',        destination: '/scp/index.html'  },
      { source: '/scp/:path*',  destination: '/scp/index.html'  },
      { source: '/lip',        destination: '/lip/index.html'  },
      { source: '/lip/:path*',  destination: '/lip/index.html'  },
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
