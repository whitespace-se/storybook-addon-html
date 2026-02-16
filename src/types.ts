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

export interface CodeUpdatePayload {
  code: string;
  options: Parameters;
}
