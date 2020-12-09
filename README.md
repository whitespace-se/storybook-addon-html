# Storybook Addon HTML

This addon for Storybook adds a tab that displays the compiled HTML for each
story. It uses [highlight.js](https://highlightjs.org/) for syntax highlighting.

![Animated preview](https://raw.githubusercontent.com/whitespace-se/storybook-addon-html/master/image.gif)

## Getting Started

With NPM:

```sh
npm i --save-dev @whitespace/storybook-addon-html
```

With Yarn:

```sh
yarn add -D @whitespace/storybook-addon-html
```

### Register addon

```js
// .storybook/main.js

module.exports = {
  // ...
  addons: [
    '@whitespace/storybook-addon-html/register',
    // ...
  ],
};
```

## Usage

Add `withHTML` as a global decorator inside `.storybook/preview.js`:

```js
// .storybook/preview.js

import { withHTML } from '@whitespace/storybook-addon-html/react';

export const decorators = [
  // ...
  withHTML,
];
```

The HTML is formatted with Prettier. You can override the Prettier config
(except `parser` and `plugins`) by providing an object following the
[Prettier API override format](https://prettier.io/docs/en/options.html):

```js
// .storybook/preview.js

import { withHTML } from '@whitespace/storybook-addon-html/react';

export const decorators = [
  // ...
  withHTML({
    prettier: {
      tabWidth: 4,
      useTabs: false,
      htmlWhitespaceSensitivity: 'strict',
    },
  }),
];
```

## Supported frameworks

When importing the decorator, use the correct path for your framework, e.g.
`@whitespace/storybook-addon-html/react` for React or
`@whitespace/storybook-addon-html/html` for HTML.

Right now, the addon can be used with these frameworks:

- HTML
- React
