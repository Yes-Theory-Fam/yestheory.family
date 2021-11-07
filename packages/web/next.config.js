const withPreact = require("next-plugin-preact");
const withTM = require("next-transpile-modules")(["@yestheory.family/ui"]);
const withImages = require("next-images");

module.exports = withImages(
  withPreact(withTM({ images: { disableStaticImages: true } }))
);
