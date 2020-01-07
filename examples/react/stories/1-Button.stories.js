import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import { Button } from '@storybook/react/demo';

export default {
  title: 'Button',
  decorators: [withKnobs],
};

export const withText = () => (
  <Button onClick={action('clicked')}>Hello Button</Button>
);

export const withEmoji = () => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);

export const withKnobsAddon = () => (
  <Button onClick={action('clicked')}>{text('Label', 'Custom label')}</Button>
);
