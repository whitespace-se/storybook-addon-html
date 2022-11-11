import React, { useState } from "react";
import { styled } from "@storybook/theming";

import { ActionBar, ScrollArea } from "@storybook/components";

import ReactSyntaxHighlighter from "react-syntax-highlighter";

const Pre = styled.pre(({ theme, padded }) => ({
  display: "flex !important",
  justifyContent: "flex-start",
  margin: 0,
  padding: padded ? `${theme.layoutMargin}px !important` : 0,
  tabSize: "2",
}));

const Code = styled.code`
  flex: 1;
  padding-right: 0;
  opacity: 1;
  counter-reset: line;

  .code-line {
    counter-increment: line;
    position: relative;
    display: block;
    margin-left: 1.5rem;
  }

  .code-line:before {
    content: counter(line);
    position: absolute;
    margin-left: -1.5rem;
    color: #000;
  }
`;

export default function SyntaxHighlighter({
  language = "jsx",
  copyable = false,
  bordered = false,
  padded = false,
  children,
  showLineNumbers = false,
  wrapLines = true,
  ...rest
}) {
  const [copied, setCopied] = useState(false);

  const onClick = async (e) => {
    e.preventDefault();
    await navigator.clipboard.writeText(children);

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  if (!children) {
    return null;
  }

  return (
    <>
      <ScrollArea vertical>
        <ReactSyntaxHighlighter
          padded={padded || bordered}
          language={language}
          useInlineStyles={true}
          PreTag={Pre}
          CodeTag={Code}
          showLineNumbers={showLineNumbers}
          wrapLines={wrapLines}
          lineProps={{ className: "code-line" }}
          {...rest}
        >
          {children.trim()}
        </ReactSyntaxHighlighter>
      </ScrollArea>
      {copyable && (
        <ActionBar
          actionItems={[{ title: copied ? "Copied" : "Copy", onClick }]}
        />
      )}
    </>
  );
}
