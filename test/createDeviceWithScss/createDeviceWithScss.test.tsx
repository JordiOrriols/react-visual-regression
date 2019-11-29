import { toMatchImageSnapshot } from 'jest-image-snapshot';
import path from 'path';
import React from 'react';

import { createDevice, imageSnapshotConfig } from '../../src/index';

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

    const stylesheet = path.resolve(__dirname, '../data/sample.scss');

    const iPhoneRender = createDevice({
        stylesheet,
        device: 'iPhone X'
    });

    const iPadRender = createDevice({
        stylesheet,
        device: 'iPad'
    });

    beforeEach(() => {
        jest.setTimeout(10000);
      });

    it('should be responsive', async () => {
        const componentWithLargeText = cardComponent('Mike');
        expect(await iPhoneRender(componentWithLargeText)).toMatchImageSnapshot(imageSnapshotConfig( 'iPhone-responsive' ));
        expect(await iPadRender(componentWithLargeText)).toMatchImageSnapshot(imageSnapshotConfig( 'iPad-responsive' ));
        
    });

    it('should be responsive with large texts', async () => {
        const componentWithLargeText = cardComponent('Juan Moreno y Herrera-Jiménez');
        expect(await iPhoneRender(componentWithLargeText)).toMatchImageSnapshot(imageSnapshotConfig( 'iPhone-largeText' ));
        expect(await iPadRender(componentWithLargeText)).toMatchImageSnapshot(imageSnapshotConfig( 'iPad-largeText' ));
        
    });

    it('should show goshted elements when disabled', async () => {
        const componentWithLargeText = cardComponent('Mike', true);
        expect(await iPhoneRender(componentWithLargeText)).toMatchImageSnapshot(imageSnapshotConfig( 'iPhone-disabled' ));
        
        // For this case we can skip different devices :)
        // expect(await iPadRender(componentWithLargeText)).toMatchImageSnapshot();
    });

});