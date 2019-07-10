const merge = require('lodash.merge');

const renderTemplate = require('./lib/renderTemplate');
const takeScreenshot = require('./lib/takeScreenshot');

const defaultOpts = {
  stylesheet: undefined,
  renderer: undefined,
  image: {
    path: undefined,
  },
};

const generateImage = async function(component, options) {
  const opts = merge(defaultOpts, options);
  const template = await renderTemplate(
    component,
    opts.stylesheet,
    opts.renderer
  );
  return await takeScreenshot(template, opts);
};

module.exports = generateImage;
