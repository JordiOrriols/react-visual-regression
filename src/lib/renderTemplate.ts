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

export const renderTemplate = async (reactElement: React.ReactElement, stylesheet: string | string[], bodyPadding: number): Promise<string> => {

  const component = renderComponent(reactElement);
  let styles = `body{padding:${bodyPadding}px}`;
  const parsedStylesheed = parseStyleSheet(stylesheet);
  if (parsedStylesheed) styles = styles + parsedStylesheed;

  const template = render(tplOpts.view, {
    component,
    styles
  });

  return template;
};
