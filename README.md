# React Visual Regresion

Usually, we only test the javascript part of our components, leaving all styles behavior uncovered.
We should test the responsiveness of our components, CSS ellipsis, empty props as well.

This package is based on Pupetter, keeping the browser ready, and handling tests with different pages in order to optimize performance.

Also will use the emulate tools from Pupetter to allow check our responsive designs without having to handle all resolutions on our code, only knowing if we want mobile, tablet or desktop test.

## Usage

#### Install

```
npm install react-visual-regresion
```

#### Use

```js
import { generateImage } from 'react-visual-regresion';

generateImage(component, options);
```

#### Default options

```js
options = {
  // Path to .css file
  stylesheet: undefined;
  device: 'iPhone X',
  renderer: ReactDOMServer.renderToStaticMarkup,
  image: {
    // Path to save image, likely unnecessary
    path: undefined,
  }
}
```

Device Emulation
Select a device from the following list:
https://github.com/GoogleChrome/puppeteer/blob/master/lib/DeviceDescriptors.js
userAgent, width, height, deviceScaleFactor will be automatically filled.

## Integration Example

Usage with `jest-image-snapshot`:

```js
import React from 'react';
import { generateImage } from 'react-visual-regresion'

const component = (
  <div>
    <h1>The Component</h1>
  </div>
);

describe('Test Component', () => {
  it('has no visual regressions', () => {

    return generateImage(component, {
      stylesheet: '../../style.css',
      viewport: {
        width: 1000,
        height: 860
      }
    }).then(image => {
      expect(image).toMatchImageSnapshot();
    });

  };
};
```
