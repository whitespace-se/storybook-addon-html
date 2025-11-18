import React from 'react';
import { SyntaxHighlighter } from 'storybook/internal/components';

interface PanelContentProps {
  code: string;
  showLineNumbers?: boolean;
  wrapLines?: boolean;
}

export const PanelContent: React.FC<PanelContentProps> = ({ code, showLineNumbers = false, wrapLines = false }) => (
  <SyntaxHighlighter
    language={'html'}
    copyable={true}
    padded={true}
    showLineNumbers={showLineNumbers}
    wrapLongLines={wrapLines}
    format={'html'}
  >
    {code}
  </SyntaxHighlighter>
);
