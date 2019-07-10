import { launch, Browser } from "puppeteer";
import * as devices from "puppeteer/DeviceDescriptors";
import { Options } from "..";

let browser: Browser;

export const takeScreenshot =  async function(template: string, opts: Options) {
  if (!browser) browser = await launch();

  const page = await browser.newPage();

  const emulateDevice =
    (opts.device && Object.values(devices).indexOf(opts.device) !== -1)
      ? opts.device
      : devices['iPhone X'];
      
  await page.emulate(emulateDevice);

  await page.setContent(template);

  const image = await page.screenshot(opts.image);
  page.close();

  return image;
};
