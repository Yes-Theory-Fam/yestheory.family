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
  features: {
    emotionAlias: false,
  },
  core: {
    builder: "@storybook/builder-vite",
  },
};
