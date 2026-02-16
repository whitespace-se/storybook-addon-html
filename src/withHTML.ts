import { useChannel, useEffect } from 'storybook/preview-api';
import type { DecoratorFunction } from 'storybook/internal/types';
import { format as formatWithPrettier } from 'prettier/standalone';
import htmlPlugin from 'prettier/plugins/html';
import { EVENTS } from './constants';
import type { Parameters } from './types';

const DEFAULT_ROOT_SELECTOR = '#storybook-root, #root';

function getRootElement(canvas: ParentNode | undefined, rootSelector: string) {
  if (typeof (canvas as ParentNode | undefined)?.querySelector === 'function') {
    const root = canvas?.querySelector(rootSelector);
    if (root) {
      return root;
    }
  }

  return document.querySelector(rootSelector);
}

function getCode(canvas: ParentNode | undefined, parameters: Parameters) {
  const rootSelector = parameters.root || DEFAULT_ROOT_SELECTOR;
  const root = getRootElement(canvas, rootSelector);
  let code = root ? root.innerHTML : `${rootSelector} not found.`;
  const { removeEmptyComments, removeComments, transform } = parameters;

  if (removeEmptyComments) {
    code = code.replace(/<!--\s*-->/g, '');
  }

  if (removeComments === true) {
    code = code.replace(/<!--[\S\s]*?-->/g, '');
  } else if (removeComments instanceof RegExp) {
    code = code.replace(/<!--([\S\s]*?)-->/g, (match, commentContent) =>
      removeComments.test(commentContent) ? '' : match,
    );
  }

  if (typeof transform === 'function') {
    try {
      code = transform(code);
    } catch (error) {
      console.error(error);
    }
  }

  return code;
}

async function prettifyHtml(code: string) {
  try {
    return await formatWithPrettier(code, {
      parser: 'html',
      plugins: [htmlPlugin],
      htmlWhitespaceSensitivity: 'ignore',
    });
  } catch (error) {
    console.error('Failed to format HTML with Prettier', error);
    return code;
  }
}

export const withHTML: DecoratorFunction = (storyFn, context) => {
  const emit = useChannel({});
  const parameters = (context.parameters?.html as Parameters | undefined) || {};

  useEffect(() => {
    const timer = window.setTimeout(async () => {
      const code = getCode(context.canvasElement as ParentNode | undefined, parameters);
      const prettifiedCode = await prettifyHtml(code);
      emit(EVENTS.CODE_UPDATE, { code: prettifiedCode, options: parameters });
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  });

  return storyFn();
};
