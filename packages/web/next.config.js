const withTM = require("next-transpile-modules")(["@yestheory.family/ui"]);
const withImages = require("next-images");

/** @type {import("next").NextConfig} */
const config = {
  images: { disableStaticImages: true },
  pageExtensions: ["page.tsx"],
  rewrites: () => [
    {
      source: "/oauth/*",
      destination: "http://localhost:5000/oauth/",
    },
    {
      source: "/graphql",
      destination: "http://localhost:5000/graphql",
    },
  ],
};

module.exports = withImages(withTM(config));
