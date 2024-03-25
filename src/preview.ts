import type { Renderer, ProjectAnnotations } from "@storybook/types";
import { withHTML } from "./withHTML";

const preview: ProjectAnnotations<Renderer> = {
  decorators: [withHTML],
};

export default preview;
