import { configure, addDecorator } from '@storybook/react';

import { withHTML } from '@whitespace/storybook-addon-html/react';

addDecorator(withHTML);

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module);
