import { Options } from "prettier";

export type Parameters = {
  highlighter?: {
    showLineNumbers?: boolean;
    wrapLines?: boolean;
  };
  prettier?: Options;
  root?: string;
  removeEmptyComments?: boolean;
  removeComments?: boolean | RegExp;
  transform?: (code: string) => string;
};
