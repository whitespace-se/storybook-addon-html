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
      const { removeEmptyComments, removeComments, customReplacement } =
        parameters;
      if (removeEmptyComments) {
        code = code.replace(/<!--\s*-->/g, "");
      }
      if (removeComments === true) {
        code = code.replace(/<!--.*?-->/g, "");
      } else if (removeComments instanceof RegExp) {
        code = code.replace(/<!--(.*?)-->/g, (match, p1) =>
          removeComments.test(p1) ? "" : match,
        );
      }

      code = customSearchAndReplace(code, customReplacement);

      emit(EVENTS.CODE_UPDATE, { code, options: parameters });
    }, 0);
    return storyFn(context);
  },
});

const customSearchAndReplace = (code, customReplacement) => {
  if (!customReplacement) {
    return code;
  }
  const getSearchReplaceObject = (input) => {
    if (input instanceof RegExp) {
      return {
        search: input,
        replace: "",
      };
    } else if (input instanceof Object) {
      const { search, replace } = input;
      return {
        search:
          search && (search instanceof RegExp || typeof search === "string")
            ? search
            : false,
        replace: replace && typeof replace === "string" ? replace : "",
      };
    }
  };

  let customReplacementList = customReplacement || [];
  if (!Array.isArray(customReplacementList)) {
    customReplacementList = [customReplacement];
  }
  customReplacementList
    .map((v) => getSearchReplaceObject(v))
    .filter((v) => v.search)
    .forEach((v) => {
      code = code.replace(v.search, v.replace);
    });
  return code;
};

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}
