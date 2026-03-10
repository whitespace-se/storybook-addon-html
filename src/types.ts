export interface Parameters {
  disable?: boolean;
  highlighter?: {
    showLineNumbers?: boolean;
    wrapLines?: boolean;
  };
  root?: string;
  removeEmptyComments?: boolean;
  removeComments?: boolean | RegExp;
  transform?: (code: string) => string;
}

export type SourceMode = 'code' | 'html';

export type StoryArgs = Record<string, unknown>;

export interface CodeUpdatePayload {
  code: string;
  options: Parameters;
}

export interface DocsSnippetPayload {
  id: string;
  args?: StoryArgs;
  source?: string | null;
  format?: boolean | 'dedent';
  sourceMode?: SourceMode;
}
