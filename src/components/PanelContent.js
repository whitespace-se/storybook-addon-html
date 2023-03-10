import React from "react";

import SyntaxHighlighter from "./SyntaxHighlighter";
import style from "react-syntax-highlighter/dist/esm/styles/hljs/github";

/**
 * Checkout https://github.com/storybookjs/storybook/blob/next/code/addons/jest/src/components/Panel.tsx
 * for a real world example
 */
export const PanelContent = ({ code, showLineNumbers, wrapLines }) => (
  <SyntaxHighlighter
    language={"xml"}
    copyable={true}
    padded={true}
    style={style}
    showLineNumbers={showLineNumbers}
    wrapLines={wrapLines}
  >
    {code}
  </SyntaxHighlighter>
);
