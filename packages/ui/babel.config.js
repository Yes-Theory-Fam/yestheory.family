module.exports = {
  plugins: [
    ["@babel/plugin-proposal-private-methods", { loose: true }],
    ["@babel/plugin-proposal-private-property-in-object", { loose: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
  ],
  presets: [
    [
      "@babel/preset-env",
      { targets: { node: "current", esmodules: true }, modules: "commonjs" },
    ],
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
};
