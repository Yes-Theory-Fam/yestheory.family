const withTM = require("next-transpile-modules")(["@yestheory.family/ui"]);
const withImages = require("next-images");

module.exports = withImages(
  withTM({
    images: { disableStaticImages: true },
    pageExtensions: ["page.tsx"],
  })
);
