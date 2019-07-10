import { Device } from "puppeteer/DeviceDescriptors";

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

export function createDevice(options: Options): (component: React.ReactElement) => Promise<string> {
  return async (component: React.ReactElement) => {
    return await render(component, options);
  };
}

export async function render (component: React.ReactElement, options: Options): Promise<string> {

  const opts = Object.assign(defaultOpts, options);

  const template = await renderTemplate(
    component,
    opts.stylesheet? opts.stylesheet: ''
  );
  
  return await takeScreenshot(template, opts);

};
