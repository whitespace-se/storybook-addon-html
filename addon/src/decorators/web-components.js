import { Node } from 'global';
import { addons, makeDecorator } from '@storybook/addons';
import { parameters } from '.';
import { EVENT_CODE_RECEIVED } from '../shared';
import { TemplateResult, render } from 'lit-html'

export const withHTML = makeDecorator({
  ...parameters,
  wrapper: (getStory, context, { options = {} }) => {
    const channel = addons.getChannel();
    const element = getStory();
    let html;
    if (typeof element === 'string') {
      html = element;
    } else if (element instanceof Node) {
      html = element.outerHTML;
    } else if (element instanceof TemplateResult) {
      let div = document.createElement('div');
      render(element, div);
      html = div.innerHTML;
      // lit-html add loads of empty comments - placeholders for efficient re-rendering
      html = html.replace(/(<!---->)/gm, '');
    }
    channel.emit(EVENT_CODE_RECEIVED, { html, options });
    return element;
  },
});

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}
