import React from 'react';
import { createDevice } from '../src/index';
import * as devices from "puppeteer/DeviceDescriptors";
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });

const component = (name: string): React.ReactElement => {
    return (
        <div>
            <h1>Hello, {name}</h1>
        </div>
    );
};

describe('Test Component', () => {

    const stylesheet = '../../style.css';

    const iPhoneRender = createDevice({
        stylesheet,
        device: devices['iPhone X']
    });

    const iPadRender = createDevice({
        stylesheet,
        device: devices['iPad']
    });

    it('should be responsive with large texts', async () => {
        const componentWithLargeText = component('Juan Moreno y Herrera-Jiménez');
        expect(await iPhoneRender(componentWithLargeText)).toMatchImageSnapshot();
        expect(await iPadRender(componentWithLargeText)).toMatchImageSnapshot();
    });

});