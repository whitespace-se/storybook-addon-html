import { addons, makeDecorator } from '@storybook/addons';
import { EVENT_CODE_RECEIVED } from '../shared';

const isValidRegExp = (expression) => {
  try {
    new RegExp(expression);
  } catch (e) {
    throw new Error(e.message);
  }
  return true;
};

export const withHTML = makeDecorator({
  name: 'withHTML',
  parameterName: 'html',
  skipIfNoParametersOrOptions: false,
  wrapper: (storyFn, context, { parameters = {} }) => {
    setTimeout(() => {
      const channel = addons.getChannel();
      const rootSelector = parameters.root || '#root';
      const root = document.querySelector(rootSelector);
      let html = root ? root.innerHTML : `${rootSelector} not found.`;
      if (parameters.removeEmptyComments) {
        html = html.replace(/<!--\s*-->/g, '');
      }
      if (parameters.removeComments) {
        const { removeComments } = parameters;
        if (typeof removeComments === 'boolean') {
          // Will remove all HTML comments
          html = html.replace(/<!--(.*?)-->/g, '');
        } else if (isValidRegExp(removeComments)) {
          // Will remove only HTML comments matching the expression provided
          html = html.replace(removeComments, '');
        }
      }
      channel.emit(EVENT_CODE_RECEIVED, { html, options: parameters });
    }, 0);
    return storyFn(context);
  },
});

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}
