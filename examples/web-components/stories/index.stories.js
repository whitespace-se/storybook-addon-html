import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { html } from 'lit-html';

export default {
  title: 'Demo',
};

export const heading = () => html`<h1>Hello World</h1>`;

export const button = () => {
  return html`<button type="button" @click="${action('clicked')}">Hello Button</button>`;
};

export const buttonWithKnobs = () => {
  const label = text('Label', 'Custom label');
  return html`<button type="button" @click="${action('clicked')}">${label}</button>`;
}