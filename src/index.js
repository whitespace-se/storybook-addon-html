import { addons, makeDecorator } from '@storybook/addons';

import { EVENT_CODE_RECEIVED } from './shared';

export const withHTML = makeDecorator({
  name: 'withHTML',
  parameterName: 'html',
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context, { options = {} }) => {
    const channel = addons.getChannel();
    const htmlMarkup = getStory(context);
    channel.emit(EVENT_CODE_RECEIVED, { html: htmlMarkup, options });
    return htmlMarkup;
  },
});
