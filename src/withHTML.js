import { makeDecorator, useChannel } from "@storybook/addons";
import { EVENTS } from "./constants";

export const withHTML = makeDecorator({
  name: "withHTML",
  parameterName: "html",
  skipIfNoParametersOrOptions: false,
  wrapper: (storyFn, context, { parameters = {} }) => {
    const emit = useChannel({});
    setTimeout(() => {
      let code;
      if (context.parameters.framework === 'html') {
        code = storyFn(context);
      } else {
        const rootSelector = parameters.root || "#storybook-root, #root";
        const root = document.querySelector(rootSelector);
        code = root ? root.innerHTML : `${rootSelector} not found.`;
      }
      const { removeEmptyComments, removeComments, transform } = parameters;
      if (removeEmptyComments) {
        code = code.replace(/<!--\s*-->/g, "");
      }
      if (removeComments === true) {
        code = code.replace(/<!--[\S\s]*?-->/g, "");
      } else if (removeComments instanceof RegExp) {
        code = code.replace(/<!--([\S\s]*?)-->/g, (match, p1) =>
          removeComments.test(p1) ? "" : match,
        );
      }
      if (typeof transform === "function") {
        try {
          code = transform(code);
        } catch (e) {
          console.error(e);
        }
      }
      emit(EVENTS.CODE_UPDATE, { code, options: parameters });
    }, 0);
    return storyFn(context);
  },
});

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}
