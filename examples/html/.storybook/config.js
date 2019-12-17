import { configure, addDecorator } from '@storybook/html';

import { withHTML } from '@whitespace/storybook-addon-html/html';

addDecorator(withHTML);

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module);
