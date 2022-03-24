module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
  ],
  "plugins": ["@babel/plugin-proposal-class-properties"],
  env: {
    esm: {
      presets: [
        [
          "@babel/preset-env",
          {
            modules: false,
          },
        ],
      ],
    },
  },
};
