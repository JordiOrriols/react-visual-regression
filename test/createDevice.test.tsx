import React from 'react';
import path from 'path';
import { createDevice } from '../src/index';
import * as devices from "puppeteer/DeviceDescriptors";
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });

const cardComponent = (name: string, disabled: boolean = false): React.ReactElement => {

    const disabledClass = (disabled)? 'disabled' : '';

    return (
        <div className={`card ${disabledClass}`}>
            <h1>Hello, {name}</h1>
        </div>
    );
};

describe('Test Component', () => {

    const stylesheet = path.resolve(__dirname, 'data/sample.css')

    const iPhoneRender = createDevice({
        stylesheet,
        device: devices['iPhone X']
    });

    const iPadRender = createDevice({
        stylesheet,
        device: devices['iPad']
    });

    it('should be responsive', async () => {
        const componentWithLargeText = cardComponent('Mike');
        expect(await iPhoneRender(componentWithLargeText)).toMatchImageSnapshot();
        expect(await iPadRender(componentWithLargeText)).toMatchImageSnapshot();
    });

    it('should be responsive with large texts', async () => {
        const componentWithLargeText = cardComponent('Juan Moreno y Herrera-Jiménez');
        expect(await iPhoneRender(componentWithLargeText)).toMatchImageSnapshot();
        expect(await iPadRender(componentWithLargeText)).toMatchImageSnapshot();
    });

    it('should show goshted elements when disabled', async () => {
        const componentWithLargeText = cardComponent('Mike', true);
        expect(await iPhoneRender(componentWithLargeText)).toMatchImageSnapshot();

        // For this case we can skip different devices :)
        // expect(await iPadRender(componentWithLargeText)).toMatchImageSnapshot();
    });

});