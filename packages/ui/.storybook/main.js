const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
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
  ],
  typescript: {
    check: true,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => ["label", "disabled"].includes(prop.name),
      //      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ["styles-loader", "css-loader", "sass-loader"],
      include: path.resolve(__dirname, "../"),
    });
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        plugins: [
          [
            "@babel/plugin-transform-react-jsx",
            { importSource: "preact", runtime: "automatic" },
          ],
        ],
      },
    });
    config.resolve.extensions.push(".ts", ".tsx");
    config.resolve.alias = {
      react: "preact/compat",
      "react-dom": "preact/compat",
    };

    return config;
  },
};
