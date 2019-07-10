import { Device } from 'puppeteer/DeviceDescriptors';

import { renderTemplate } from './lib/renderTemplate';
import { takeScreenshot } from './lib/takeScreenshot';

export interface Options {
  stylesheet?: string;
  device?: Device;
}

const defaultOpts: Options = {
  stylesheet: undefined,
  device: undefined
};

export const createDevice = (options: Options): (component: React.ReactElement) => Promise<string> => {
  return async (component: React.ReactElement): Promise<string> => {
    return render(component, options);
  };
};

export const render = async (component: React.ReactElement, options: Options): Promise<string> => {

  const opts = {...defaultOpts, ...options};

  const template = await renderTemplate(
    component,
    opts.stylesheet ? opts.stylesheet : ''
  );

  return takeScreenshot(template, opts);

};
