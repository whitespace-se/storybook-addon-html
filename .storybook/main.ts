import type { StorybookConfig } from "@storybook/react-vite";
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-docs", "./local-preset.js"],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  }
};
export default config;
