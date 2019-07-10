import { Device } from "puppeteer/DeviceDescriptors";

import { renderTemplate } from './lib/renderTemplate';
import { takeScreenshot } from './lib/takeScreenshot';

export interface Options {
  stylesheet?: string;
  renderer?: any;
  device?: Device;
  image?: {
    path?: string
  }
}

const defaultOpts: Options = {
  stylesheet: undefined,
  renderer: undefined,
  image: {
    path: undefined,
  },
};

export async function generateImage (component: React.ReactElement, options: Options): Promise<Buffer> {

  const opts = Object.assign(defaultOpts, options);

  const template = await renderTemplate(
    component,
    opts.stylesheet? opts.stylesheet: ''
  );
  
  return await takeScreenshot(template, opts);
  
};
