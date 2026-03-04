export interface CSSParameters {
  enabled?: boolean;
  includeCustomProperties?: boolean;
  includeMediaQueries?: boolean;
  includeFontFace?: boolean;
  includeKeyframes?: boolean;
  includeLayerRules?: boolean;
  scoping?: string | false;
  transform?: (css: string) => string;
}

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
  css?: CSSParameters;
}

export interface CodeUpdatePayload {
  code: string;
  css: string;
  options: Parameters;
}
