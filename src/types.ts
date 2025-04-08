export type Parameters = {
  highlighter?: {
    showLineNumbers?: boolean;
    wrapLines?: boolean;
  };
  root?: string;
  removeEmptyComments?: boolean;
  removeComments?: boolean | RegExp;
  transform?: (code: string) => string;
};
