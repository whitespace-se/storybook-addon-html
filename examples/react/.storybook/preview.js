import { withHTML } from '@whitespace/storybook-addon-html/react';

export const decorators = [withHTML];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
