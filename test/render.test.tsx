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

describe('render', () => {

  it('generates an image', async () => {

    const image = await render(component, {
      stylesheet: path.resolve(__dirname, 'data/sample.css')
    });

    expect(image).toBe(true);
  });

});
