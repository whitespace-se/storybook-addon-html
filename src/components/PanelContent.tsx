import React from "react";
import style from "react-syntax-highlighter/dist/esm/styles/hljs/github";
import SyntaxHighlighter from "./SyntaxHighlighter";

interface PanelContentProps {
  code: string;
  showLineNumbers?: boolean;
  wrapLines?: boolean;
}

export const PanelContent: React.FC<PanelContentProps> = ({
  code,
  showLineNumbers = false,
  wrapLines = false,
}) => (
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
