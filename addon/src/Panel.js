import React, { useState } from 'react';
import { useChannel } from '@storybook/api';

import SyntaxHighlighter from './SyntaxHighlighter';
import style from 'react-syntax-highlighter/dist/esm/styles/hljs/github-gist';
import { format as prettierFormat } from 'prettier/standalone';
import prettierHtml from 'prettier/parser-html';

import { EVENT_CODE_RECEIVED } from './shared';

const HTMLPanel = () => {
  const [state, setState] = useState('');
  useChannel({
    [EVENT_CODE_RECEIVED]: ({ html, options }) => {
      const { prettier = {} } = options;
      const prettierConfig = {
        htmlWhitespaceSensitivity: 'ignore',
        ...prettier,
        // Ensure we always pick the html parser
        parser: 'html',
        plugins: [prettierHtml],
      };
      const code = prettierFormat(html, prettierConfig);
      setState(code);
    },
  });
  return (
    <SyntaxHighlighter
      language={'xml'}
      copyable={true}
      padded={true}
      style={style}
    >
      {state}
    </SyntaxHighlighter>
  );
};

export default HTMLPanel;
