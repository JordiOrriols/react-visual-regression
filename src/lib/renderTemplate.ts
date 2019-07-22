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

  let styles = `body{padding:${bodyPadding}px}*{-o-transition-property: none !important;-moz-transition-property: none !important;-ms-transition-property: none !important;-webkit-transition-property: none !important;transition-property: none !important;}*{-webkit-animation: none !important;-moz-animation: none !important;-o-animation: none !important;-ms-animation: none !important;animation: none !important;}`;

  const parsedStylesheed = parseStyleSheet(stylesheet);
  if (parsedStylesheed) styles = styles + parsedStylesheed;

  const template = render(tplOpts.view, {
    component,
    styles
  });

  return template;
};
