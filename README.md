# Storybook Addon HTML

This addon for Storybook allows you to display the compiled HTML for your stories. It uses [highlight.js](https://highlightjs.org/) for syntax highlighting.

## Getting Started

```sh
npm i --save-dev @whitespace/storybook-addon-html
```

### Register addon

Create a file called `addons.js` inside the `.storybook` directory and add the following content:

```js
// .storybook/addons.js

import '@whitespace/storybook-addon-html/register';
```

## Usage

Add `withHTML` as a global decorator inside `.storybook/config.js`:

```js
// .storybook/config.js

import { addDecorator } from '@storybook/html';
import { withHTML } from '@whitespace/storybook-addon-html';
addDecorator(withHTML);
```

The HTML is formatted with Prettier. You can override the Prettier config (except `parser` and `plugins`) by providing an object following the [Prettier API override format](https://prettier.io/docs/en/options.html):

```js
// .storybook/config.js

import { addDecorator } from '@storybook/html';
import { withHTML } from '@whitespace/storybook-addon-html';
addDecorator(
  withHTML({
    prettier: {
      tabWidth: 4,
      useTabs: false,
      htmlWhitespaceSensitivity: 'strict',
    },
  }),
);
```
