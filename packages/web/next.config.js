const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

/** @returns {import("next").NextConfig} */
const config = (phase) => ({
  productionBrowserSourceMaps: true,
  experimental: {
    appDir: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  rewrites: () => [
    {
      source: "/graphql",
      destination: "http://localhost:5000/graphql",
    },
    {
      source: "/oauth/:slug*",
      destination: "http://localhost:5000/oauth/:slug*",
    },
  ],
  headers: () => [
    {
      source: "/:path*",
      headers: [
        { key: "X-Frame-Options", value: "DENY" },
        {
          key: "Content-Security-Policy",
          value: `default-src 'self'; img-src 'self' https://cdn.discordapp.com/avatars/ data:; child-src 'none'; script-src 'self' 'unsafe-inline' ${
            phase === PHASE_DEVELOPMENT_SERVER ? "'unsafe-eval'" : ""
          }; style-src 'self' 'unsafe-inline'; frame-ancestors 'none'`,
        },
      ],
    },
  ],
});

module.exports = (...args) => config(...args);
