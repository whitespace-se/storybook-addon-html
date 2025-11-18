import type { ProjectAnnotations, Renderer } from 'storybook/internal/types';
import { withHTML } from './withHTML';

const preview: ProjectAnnotations<Renderer> = {
  decorators: [withHTML],
};

export default preview;
