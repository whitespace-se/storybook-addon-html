import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs/html';

export default {
  title: 'Demo',
  decorators: [withKnobs],
};

export const heading = () => '<h1>Hello World</h1>';

export const button = () => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.innerText = 'Hello Button';
  btn.addEventListener('click', action('clicked'));
  return btn;
};

export const buttonWithKnobs = () => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.innerText = text('Label', 'Custom label');
  btn.addEventListener('click', action('clicked'));
  return btn;
};
