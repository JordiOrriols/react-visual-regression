import { configure, render } from 'nunjucks';
import { join } from 'path';

import { parseStyleSheet } from './parseStyleSheet';
import { renderComponent } from './renderComponent';

const tplOpts = {
  path: join(__dirname, '../../view'),
  view: 'index.njk'
};

configure(tplOpts.path, {
  autoescape: true
});

export const renderTemplate = async (reactElement: React.ReactElement, stylesheet: string): Promise<string> => {

  const component = renderComponent(reactElement);
  const styles = parseStyleSheet(stylesheet);

  const template = render(tplOpts.view, {
    component,
    styles
  });

  return template;
};
