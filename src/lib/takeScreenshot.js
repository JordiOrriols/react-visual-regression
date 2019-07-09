const puppeteer = require('puppeteer');

let browser;

module.exports = async function(template, opts) {
  if (!browser) browser = await puppeteer.launch();

  const page = await browser.newPage();
  const emulateDevice =
    puppeteer.devices.indexOf(opts.device) !== -1
      ? opts.device
      : puppeteer.devices['iPhone X'];
  await page.emulate(emulateDevice);

  await page.setContent(template);

  const image = await page.screenshot(opts.image);
  page.close();

  return image;
};
