import React, { memo } from 'react';
import { AddonPanel, SyntaxHighlighter } from 'storybook/internal/components';
import { useAddonState, useChannel, useParameter } from 'storybook/manager-api';
import { ADDON_ID, EVENTS, PARAM_KEY } from '../constants';
import type { CodeUpdatePayload, Parameters } from '../types';

interface PanelProps {
  active?: boolean;
}

interface PanelState {
  code: string;
}

const DEFAULT_PARAMETERS: Parameters = {
  highlighter: {
    showLineNumbers: false,
    wrapLines: true,
  },
};

export const Panel = memo(function Panel({ active = false }: PanelProps) {
  const [{ code }, setState] = useAddonState<PanelState>(ADDON_ID, {
    code: '',
  });

  useChannel({
    [EVENTS.CODE_UPDATE]: ({ code: nextCode }: CodeUpdatePayload) => {
      setState((state) => ({ ...state, code: nextCode }));
    },
  });

  const parameters = useParameter<Parameters>(PARAM_KEY, DEFAULT_PARAMETERS);
  const { highlighter: { showLineNumbers = false, wrapLines = true } = {} } = parameters;

  return (
    <AddonPanel active={active}>
      <SyntaxHighlighter
        language="html"
        copyable
        padded
        format={false}
        showLineNumbers={showLineNumbers}
        wrapLongLines={wrapLines}
      >
        {code}
      </SyntaxHighlighter>
    </AddonPanel>
  );
});
