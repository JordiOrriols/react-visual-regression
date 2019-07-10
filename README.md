# React Visual regression (Alpha version)

***
In development: Keep in mind that this package will change the API during this following weeks.
***

Usually, we only test the javascript part of our components, leaving all styles behavior uncovered.
We should test the responsiveness of our components, CSS ellipsis, empty props as well.

This package is based on Pupetter, keeping the browser ready, and handling tests with different pages in order to optimize performance.

Also will use the emulate tools from Pupetter to allow check our responsive designs without having to handle all resolutions on our code, only knowing if we want mobile, tablet or desktop test.

## Usage

#### Install

```
npm install react-visual-regression
```

#### Use

```js
import { render } from 'react-visual-regression';

render(component, options);
```

#### Default options

```js

import * as devices from "puppeteer/DeviceDescriptors";

options = {
  // Path to .css / .scss file
  stylesheet: undefined;
  device: devices['iPhone X'],
  bodyPadding: 10
}
```

Device Emulation
Select a device from the following list:
https://github.com/GoogleChrome/puppeteer/blob/master/lib/DeviceDescriptors.js
userAgent, width, height, deviceScaleFactor will be automatically used.

## Integration Example

Usage with `jest-image-snapshot`:

```js
import React from 'react';
import { render } from 'react-visual-regression'

const component = (
  <div>
    <h1>The Component</h1>
  </div>
);

describe('Test Component', () => {
  it('has no visual regressions', async () => {

    const image = await render(component, {
      stylesheet: '../../style.css',
    });

    expect(image).toMatchImageSnapshot();

  });
});
```

### Real world example reusing settings

It's recomended to use ```customSnapshotIdentifier````property in order to avoid errors

```js
import React from 'react';
import path from 'path';
import { createDevice } from '../../src/index';
import * as devices from "puppeteer/DeviceDescriptors";
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });

const cardComponent = (name: string, disabled: boolean = false): React.ReactElement => {

    const disabledClass = (disabled) ? 'disabled' : '';

    return (
        <div className={`card ${disabledClass}`}>
            <h1>Hello, {name}</h1>
        </div>
    );
};

describe('Test Component', () => {

    const stylesheet = path.resolve(__dirname, '../data/sample.css');

    const iPhoneRender = createDevice({
        stylesheet,
        device: devices['iPhone X']
    });

    const iPadRender = createDevice({
        stylesheet,
        device: devices['iPad']
    });

    beforeEach(() => {
        jest.setTimeout(10000);
      });

    it('should be responsive', async () => {
        const componentWithLargeText = cardComponent('Mike');
        expect(await iPhoneRender(componentWithLargeText)).toMatchImageSnapshot({ customSnapshotIdentifier: 'iPhone-responsive' });
        expect(await iPadRender(componentWithLargeText)).toMatchImageSnapshot({ customSnapshotIdentifier: 'iPad-responsive' });
    });

    it('should be responsive with large texts', async () => {
        const componentWithLargeText = cardComponent('Juan Moreno y Herrera-Jiménez');
        expect(await iPhoneRender(componentWithLargeText)).toMatchImageSnapshot({ customSnapshotIdentifier: 'iPhone-largeText' });
        expect(await iPadRender(componentWithLargeText)).toMatchImageSnapshot({ customSnapshotIdentifier: 'iPad-largeText' });
    });

    it('should show goshted elements when disabled', async () => {
        const componentWithLargeText = cardComponent('Mike', true);
        expect(await iPhoneRender(componentWithLargeText)).toMatchImageSnapshot({ customSnapshotIdentifier: 'iPhone-disabled' });
        // For this case we can skip different devices :)
        // expect(await iPadRender(componentWithLargeText)).toMatchImageSnapshot();
    });

});
```