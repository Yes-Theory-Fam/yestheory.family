// This file is a slightly modified copy from jest-preset-preact/babel.js to add a config to @babel/preset-env
const { createTransformer } = require("babel-jest").default;

module.exports = createTransformer({
  presets: [
    [
      "@babel/preset-typescript",
      {
        jsxPragma: "h",
        jsxPragmaFrag: "Fragment",
      },
    ],
    ["@babel/preset-env", { targets: { esmodules: true } }],
  ],
  plugins: [
    [
      "@babel/plugin-transform-react-jsx",
      {
        pragma: "h",
        pragmaFrag: "Fragment",
      },
    ],
    "@babel/plugin-proposal-class-properties",
  ],
  babelrc: false,
  configFile: false,
});
