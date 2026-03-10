import { useChannel, useEffect, useGlobals, useRef } from 'storybook/preview-api';
import { SNIPPET_RENDERED } from 'storybook/internal/docs-tools';
import type { DecoratorFunction } from 'storybook/internal/types';
import { format as formatWithPrettier } from 'prettier/standalone';
import htmlPlugin from 'prettier/plugins/html';
import { DOCS_SOURCE_MODE_GLOBAL, EVENTS } from './constants';
import type { DocsSnippetPayload, Parameters, SourceMode, StoryArgs } from './types';

const DEFAULT_ROOT_SELECTOR = '#storybook-root, #root';
const htmlSources = new Map<string, string>();
const frameworkSources = new Map<string, DocsSnippetPayload>();
// We use a module-level variable rather than reading storyContext.globals inside
// transformDocsSource because: (1) the Source block doesn't subscribe to
// GLOBALS_UPDATED — it only re-renders when SNIPPET_RENDERED fires, so globals
// on the storyContext may be stale between a toggle and the next snippet emit;
// (2) when no story is resolved, storyContext is {} with no globals at all.
// The decorator sets this synchronously on every render, so it's always current.
let currentSourceMode: SourceMode = 'code';

function getSourceMode(globals: Record<string, unknown> | undefined): SourceMode {
  return globals?.[DOCS_SOURCE_MODE_GLOBAL] === 'html' ? 'html' : 'code';
}

function getStoryArgs(context: { args: StoryArgs; unmappedArgs?: StoryArgs }) {
  return context.unmappedArgs || context.args;
}

function getSnippetKey({ args, format, id, source, sourceMode }: DocsSnippetPayload) {
  return JSON.stringify({
    args,
    format,
    id,
    source,
    sourceMode,
  });
}

export function transformDocsSource(code: string, storyContext: { id?: string; globals?: Record<string, unknown> }) {
  if (!storyContext.id || currentSourceMode !== 'html') {
    return code;
  }

  return htmlSources.get(storyContext.id) ?? code;
}

function getStoryRoot(root: ParentNode | Document, storyId: string) {
  if (typeof root.querySelector !== 'function') {
    return undefined;
  }

  const escapedId = CSS.escape(`story--${storyId}`);
  const exactStoryRoot = root.querySelector(`[data-story-block="true"]#${escapedId}`);
  if (exactStoryRoot instanceof Element) {
    return exactStoryRoot;
  }

  const storyRoot = root.querySelector(`[data-story-block="true"][id^="${escapedId}"]`);
  return storyRoot instanceof Element ? storyRoot : undefined;
}

function getRootElement(canvas: ParentNode | undefined, rootSelector: string, storyId: string) {
  if (typeof (canvas as ParentNode | undefined)?.querySelector === 'function') {
    const root = canvas?.querySelector(rootSelector);
    if (root instanceof Element && root.innerHTML.trim() !== '') {
      return root;
    }

    const storyRoot =
      canvas instanceof Element && canvas.matches('[data-story-block="true"]')
        ? canvas
        : canvas?.querySelector('[data-story-block="true"]');

    if (storyRoot instanceof Element) {
      return storyRoot;
    }
  }

  const storyRoot = getStoryRoot(document, storyId);
  if (storyRoot) {
    return storyRoot;
  }

  return document.querySelector(rootSelector);
}

function getCode(canvas: ParentNode | undefined, parameters: Parameters, storyId: string) {
  const rootSelector = parameters.root || DEFAULT_ROOT_SELECTOR;
  const root = getRootElement(canvas, rootSelector, storyId);
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

async function getCodeWhenReady(canvas: ParentNode | undefined, parameters: Parameters, storyId: string) {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const code = getCode(canvas, parameters, storyId);
    if (code.trim() !== '') {
      return code;
    }

    await new Promise((resolve) => {
      window.setTimeout(resolve, 100);
    });
  }

  return getCode(canvas, parameters, storyId);
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
  const [globals] = useGlobals();
  const lastSnippetKey = useRef<string>('');
  const emit = useChannel({
    [SNIPPET_RENDERED]: (payload: DocsSnippetPayload) => {
      if (!payload.id || payload.sourceMode) {
        return;
      }

      frameworkSources.set(payload.id, payload);
    },
  });
  const parameters = (context.parameters?.html as Parameters | undefined) || {};
  currentSourceMode = getSourceMode(globals);

  // No dependency array: must re-run on every render to pick up globals and args changes.
  useEffect(() => {
    const timer = window.setTimeout(async () => {
      const storyArgs = getStoryArgs(context);
      const code = await getCodeWhenReady(context.canvasElement as ParentNode | undefined, parameters, context.id);
      const prettifiedCode = await prettifyHtml(code);
      const sourceMode = currentSourceMode;
      const frameworkSource = frameworkSources.get(context.id);

      htmlSources.set(context.id, prettifiedCode);
      emit(EVENTS.CODE_UPDATE, { code: prettifiedCode, options: parameters });

      const docsSnippet =
        sourceMode === 'html'
          ? {
              id: context.id,
              args: storyArgs,
              source: prettifiedCode,
              format: false,
              sourceMode,
            }
          : frameworkSource
            ? {
                ...frameworkSource,
                args: frameworkSource.args || storyArgs,
                sourceMode,
              }
            : undefined;

      if (!docsSnippet) {
        lastSnippetKey.current = '';
        return;
      }

      const nextSnippetKey = getSnippetKey(docsSnippet);
      if (nextSnippetKey === lastSnippetKey.current) {
        return;
      }

      lastSnippetKey.current = nextSnippetKey;
      emit(SNIPPET_RENDERED, docsSnippet);
    }, 0);

    return () => {
      window.clearTimeout(timer);
      htmlSources.delete(context.id);
      frameworkSources.delete(context.id);
    };
  });

  return storyFn();
};
