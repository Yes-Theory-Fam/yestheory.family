const preactPreset = require("jest-preset-preact");
const path = require("path");

const transformIgnorePatterns = [
  "<rootDir>/node_modules/(?!storybook-addon-performance)/",
  "node_modules/(?!storybook-addon-performance/)",
  "^.+\\.(css|sass|scss|less)$",
];

module.exports = {
  ...preactPreset,
  transform: {
    "^.+\\.(mjs|js|jsx|ts|tsx)$": path.join(__dirname, ".jest", "babel"),
    "^.+\\.mdx$": "@storybook/addon-docs/jest-transform-mdx",
  },
  transformIgnorePatterns,
  setupFiles: ["<rootDir>/.jest/setup.js"],
};
