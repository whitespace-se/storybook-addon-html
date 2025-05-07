import React from "react";
import {
  useAddonState,
  useChannel,
  useParameter,
} from "storybook/internal/manager-api";
import { AddonPanel } from "storybook/internal/components";
import { ADDON_ID, EVENTS, PARAM_KEY } from "./constants";
import { PanelContent } from "./components/PanelContent";

interface PanelProps {
  active: boolean;
}

export const Panel: React.FC<PanelProps> = (props) => {
  // https://storybook.js.org/docs/react/addons/addons-api#useaddonstate
  const [{ code }, setState] = useAddonState(ADDON_ID, {
    code: null,
  });

  // https://storybook.js.org/docs/react/addons/addons-api#usechannel
  useChannel({
    [EVENTS.CODE_UPDATE]: ({ code }) => {
      setState((state) => ({ ...state, code }));
    },
  });

  const parameters = useParameter(PARAM_KEY, {
    highlighter: { showLineNumbers: false, wrapLines: true },
  });
  const {
    highlighter: { showLineNumbers = false, wrapLines = true } = {},
  } = parameters;

  return (
    <AddonPanel {...props}>
      <PanelContent
        code={code}
        showLineNumbers={showLineNumbers}
        wrapLines={wrapLines}
      />
    </AddonPanel>
  );
};
