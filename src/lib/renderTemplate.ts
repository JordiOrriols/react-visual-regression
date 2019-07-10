import { renderComponent } from './renderComponent';
import { parseStyleSheet } from './parseStyleSheet';
import { join } from 'path';
import { configure, render } from 'nunjucks';

const tplOpts = {
  path: join(__dirname, '../view'),
  view: 'index.njk',
};

configure(tplOpts.path, {
  autoescape: true,
});

export const renderTemplate = async function (component: React.ReactElement, stylesheet: string) {
  const template = render(tplOpts.view, {
    component: await renderComponent(component),
    styles: await parseStyleSheet(stylesheet),
  });

  return template;
};
