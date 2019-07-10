import fs from 'fs';
import path from 'path';
import React from 'react';
import { render } from '../src/index';

jest.setTimeout(30000);

const component = (
  <div>
    <h1>Component Image</h1>
    <h2>Hello world</h2>
  </div>
);

describe('generateImage()', () => {
  it('saves an image', async () => {

    await render(component, {
      stylesheet: path.resolve(__dirname, 'data/sample.css'),
      image: {
        path: './test/data/image.png',
      },
    });

    const image = fs.existsSync(path.join(__dirname, 'data/image.png'));
    expect(image).toBe(true);
  });
});
