const puppeteer = require('puppeteer');

let browser;

module.exports = async function(template, opts) {
  if (!browser) browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.setContent(template);

  await page.setViewport(opts.viewport);

  const image = await page.screenshot(opts.image);
  page.close();

  return image;
};
