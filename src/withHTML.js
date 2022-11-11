import { makeDecorator, useChannel } from "@storybook/addons";
import { EVENTS } from "./constants";

export const withHTML = makeDecorator({
  name: "withHTML",
  parameterName: "html",
  skipIfNoParametersOrOptions: false,
  wrapper: (storyFn, context, { parameters = {} }) => {
    const emit = useChannel({});
    setTimeout(() => {
      const rootSelector = parameters.root || "#root";
      const root = document.querySelector(rootSelector);
      let code = root ? root.innerHTML : `${rootSelector} not found.`;
      if (parameters.removeEmptyComments) {
        code = code.replace(/<!--\s*-->/g, "");
      }
      emit(EVENTS.CODE_UPDATE, { code, options: parameters });
    }, 0);
    return storyFn(context);
  },
});

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}
