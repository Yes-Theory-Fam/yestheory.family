const WebpackModules = require("webpack-modules");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@chakra-ui/storybook-addon",
    "@storybook/addon-links",
    {
      name: "@storybook/addon-docs",
      options: {
        sourceLoaderOptions: {
          parser: "typescript",
          injectStoryParameters: false,
        },
      },
    },
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    {
      name: "@storybook/preset-scss",
      options: {
        cssLoaderOptions: {
          modules: {
            auto: true,
            localIdentName: "[name]__[local]--[hash:base64:5]",
          },
        },
      },
    },
    "storybook-addon-performance/register",
  ],
  typescript: {
    check: true,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  features: {
    emotionAlias: false,
  },
  webpackFinal: async (config) => {
    config.plugins.push(new WebpackModules());

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        plugins: [
          [
            "@babel/plugin-transform-react-jsx",
            { importSource: "react", runtime: "automatic" },
          ],
        ],
      },
    });
    config.resolve.extensions.push(".ts", ".tsx");

    return config;
  },
};
