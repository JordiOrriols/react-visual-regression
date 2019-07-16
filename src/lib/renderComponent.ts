import { reactVirtualRenderer } from './reactVirtualRenderer';

export const renderComponent = (component: React.ReactElement): string => {
  const renderedComponent = reactVirtualRenderer(component);

  return renderedComponent.outerHTML;
};
