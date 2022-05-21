const transformIgnorePatterns = [
  "<rootDir>/node_modules/(?!storybook-addon-performance)/",
  "node_modules/(?!storybook-addon-performance/)",
  "^.+\\.(css|sass|scss|less)$",
];

module.exports = {
  setupFilesAfterEnv: ["<rootDir>/.jest/setup.ts"],
  transform: {
    "^.+\\.(t|j)sx?$": "babel-jest",
    "^.+\\.mdx$": "@storybook/addon-docs/jest-transform-mdx",
  },
  transformIgnorePatterns,
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|scss|svg|webp)$": "<rootDir>/.jest/fileMock.js",
  },
  testEnvironment: "jest-environment-jsdom",
};
