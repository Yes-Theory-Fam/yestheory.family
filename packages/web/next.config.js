const withPreact = require("next-plugin-preact");
const withTM = require("next-transpile-modules")(["@project/ui"]);

module.exports = withPreact(withTM({}));
