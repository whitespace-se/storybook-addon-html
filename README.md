# Storybook Addon HTML

This addon for Storybook adds a tab that displays the compiled HTML for each
story.

![Animated preview](https://raw.githubusercontent.com/whitespace-se/storybook-addon-html/master/image.gif)

## Requirements

Version 6 of this addon requires Storybook 8 and Prettier 3. If you are still
using Storybook 7, you can use version 5.

As of version 7 of this addon, the `react-syntax-highlighter` dependency is no
longer required. The addon will use the default syntax highlighter of Storybook,
which also formats the code with Prettier.

## Getting Started

Install the addon and its dependencies.

With NPM:

```sh
npm i --save-dev @whitespace/storybook-addon-html
```

With Yarn:

```sh
yarn add -D @whitespace/storybook-addon-html
```

With PNPM:

```sh
pnpm add -D @whitespace/storybook-addon-html
```

### Register addon

```js
// .storybook/main.js

module.exports = {
  // ...
  addons: [
    "@whitespace/storybook-addon-html",
    // ...
  ],
};
```

## Usage

You can override the wrapper element selector used to grab the component HTML.

```js
export const parameters = {
  html: {
    root: "#my-custom-wrapper", // default: #root
  },
};
```

Some frameworks put comments inside the HTML. If you want to remove these you
can use the `removeComments` parameter. Set it to `true` to remove all comments
or set it to a regular expression that matches the content of the comments you
want to remove.

```js
export const parameters = {
  html: {
    removeComments: /^\s*remove me\s*$/, // default: false
  },
};
```

You can also use the `removeEmptyComments` parameter to remove only empty
comments like `<!---->` and `<!-- -->`.

```js
export const parameters = {
  html: {
    removeEmptyComments: true, // default: false
  },
};
```

You can override the `showLineNumbers` and `wrapLines` settings for the syntax
highlighter by using the `highlighter` parameter:

```js
export const parameters = {
  html: {
    highlighter: {
      showLineNumbers: true, // default: false
      wrapLines: false, // default: true
    },
  },
};
```

Another way of hiding unwanted code is to define the `transform` option. It
allows you to perform any change to the output code, e.g. removing attributes
injected by frameworks.

```js
html: {
  transform: (code) => {
    // Remove attributes `_nghost` and `ng-reflect` injected by Angular:
    return code.replace(/(?:_nghost|ng-reflect).*?="[\S\s]*?"/g, "");
  };
}
```

You can disable the HTML panel by setting the `disable` parameter to true.
This will hide and disable the HTML addon in your stories.

```js
html: {
  disable: true, // default: false
}
```
