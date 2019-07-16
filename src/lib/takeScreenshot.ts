import { launch, Browser } from 'puppeteer';
import * as devices from 'puppeteer/DeviceDescriptors';

import { Options } from '..';

let browser: Browser;

export const defaultDevice = 'iPhone X';

const getDevice = (device: devices.Device | string): devices.Device => {
  if (!device) return devices[defaultDevice];

  if (typeof device === 'string') {
    return (Object.keys(devices).indexOf(device) !== -1) ? devices[device] : devices[defaultDevice];
  }

  return device;

};

export const takeScreenshot = async (template: string, opts: Options): Promise<string> => {

  if (!browser) {
    browser = await launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }

  const page = await browser.newPage();

  const emulateDevice = getDevice(opts.device);

  await page.emulate(emulateDevice);

  await page.setContent(template);

  const image = await page.screenshot();

  await page.close();

  return image;

};
