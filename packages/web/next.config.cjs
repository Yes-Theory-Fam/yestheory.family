const analyzerPlugin = require('@next/bundle-analyzer');
const {withPayload} = require('@payloadcms/next/withPayload');
const {PHASE_DEVELOPMENT_SERVER} = require('next/constants');

const withBundleAnalyzer = analyzerPlugin();

/** @returns {import("next").NextConfig} */
const config = (phase) => ({
  productionBrowserSourceMaps: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/media/file/*',
      },
      {
        protocol: 'https',
        hostname: 'admin.staging.yestheory.family',
      },
      {
        protocol: 'https',
        hostname: 'admin.yestheory.family',
      },
    ],
  },
  rewrites: async () => [
    {
      source: '/graphql',
      destination: 'http://localhost:5000/graphql',
    },
    {
      source: '/typesense/:slug*',
      destination: 'http://localhost:8108/:slug*',
    },
    {
      source: '/oauth/:slug*',
      destination: 'http://localhost:5000/oauth/:slug*',
    },
  ],
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {key: 'X-Frame-Options', value: 'DENY'},
        {
          key: 'Content-Security-Policy',
          value: `default-src 'self'; img-src 'self' https://cdn.discordapp.com/avatars/ data:; child-src 'none'; script-src 'self' 'unsafe-inline' ${
            phase === PHASE_DEVELOPMENT_SERVER ? "'unsafe-eval'" : ''
          }; style-src 'self' 'unsafe-inline'; frame-ancestors 'none'`,
        },
      ],
    },
  ],
});

// TODO configure payload.config.ts -> csrf

module.exports = (...args) => {
  const inner =
    process.env.ANALYZE === 'true'
      ? withBundleAnalyzer(config(...args))
      : config(...args);

  return withPayload(inner);
};
