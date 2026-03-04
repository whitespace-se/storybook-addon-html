import React, { memo, useCallback, useMemo } from 'react';
import { AddonPanel, SyntaxHighlighter } from 'storybook/internal/components';
import { useAddonState, useChannel, useParameter } from 'storybook/manager-api';
import { ADDON_ID, EVENTS, PARAM_KEY } from '../constants';
import type { CodeUpdatePayload, Parameters } from '../types';

interface PanelProps {
  active?: boolean;
}

type ViewMode = 'html' | 'css' | 'combined';

interface PanelState {
  code: string;
  css: string;
  viewMode: ViewMode;
}

const DEFAULT_PARAMETERS: Parameters = {
  highlighter: {
    showLineNumbers: false,
    wrapLines: true,
  },
};

function getCombinedCode(html: string, css: string): string {
  if (!css.trim()) return html;
  return `<style>\n${css}</style>\n\n${html}`;
}

const tabBarStyle: React.CSSProperties = {
  display: 'flex',
  gap: 0,
  borderBottom: '1px solid var(--color-border-muted-default, #e0e0e0)',
  padding: '0 8px',
  backgroundColor: 'var(--color-bg-base, transparent)',
};

const tabBaseStyle: React.CSSProperties = {
  padding: '6px 12px',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: 600,
  color: 'var(--color-text-muted-default, #666)',
  borderBottom: '2px solid transparent',
  marginBottom: '-1px',
};

const tabActiveStyleOverrides: React.CSSProperties = {
  color: 'var(--color-text-primary-default, #029cfd)',
  borderBottomColor: 'var(--color-text-primary-default, #029cfd)',
};

export const Panel = memo(function Panel({ active = false }: PanelProps) {
  const [state, setState] = useAddonState<PanelState>(ADDON_ID, {
    code: '',
    css: '',
    viewMode: 'html',
  });

  const { code, css, viewMode } = state;

  useChannel({
    [EVENTS.CODE_UPDATE]: ({ code: nextCode, css: nextCss }: CodeUpdatePayload) => {
      setState((prev) => ({
        ...prev,
        code: nextCode,
        css: nextCss || '',
      }));
    },
  });

  const parameters = useParameter<Parameters>(PARAM_KEY, DEFAULT_PARAMETERS);
  const { highlighter: { showLineNumbers = false, wrapLines = true } = {} } = parameters;
  const cssEnabled = parameters.css?.enabled === true;

  const setViewMode = useCallback(
    (mode: ViewMode) => {
      setState((prev) => ({ ...prev, viewMode: mode }));
    },
    [setState],
  );

  const displayCode = useMemo(() => {
    switch (viewMode) {
      case 'css':
        return css || '/* No CSS extracted */';
      case 'combined':
        return getCombinedCode(code, css);
      default:
        return code;
    }
  }, [viewMode, code, css]);

  const language = viewMode === 'css' ? 'css' : 'html';

  return (
    <AddonPanel active={active}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {cssEnabled && (
          <div style={tabBarStyle}>
            {(['html', 'css', 'combined'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setViewMode(tab)}
                style={viewMode === tab ? { ...tabBaseStyle, ...tabActiveStyleOverrides } : tabBaseStyle}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
        )}
        <SyntaxHighlighter
          language={language}
          copyable
          padded
          format={false}
          showLineNumbers={showLineNumbers}
          wrapLongLines={wrapLines}
        >
          {displayCode}
        </SyntaxHighlighter>
      </div>
    </AddonPanel>
  );
});
