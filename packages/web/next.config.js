const withTM = require("next-transpile-modules")(["@yestheory.family/ui"]);
const withImages = require("next-images");

/** @type {import("next").NextConfig} */
const config = {
  images: { disableStaticImages: true },
  pageExtensions: ["page.tsx"],
  productionBrowserSourceMaps: true,
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
};

module.exports = withImages(withTM(config));
