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

describe('Benchmark Test', () => {

    const stylesheet = path.resolve(__dirname, '../data/sample.css');

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

    const numberOfTests = 100;
    const testIds = (new Array(numberOfTests + 1)).fill(undefined).map((_: undefined, i: number) => i.toString());

    test.each(testIds)('Benchmark test #%s', async (index: string) => {
        const componentWithLargeText = cardComponent('Mike');
        expect(await iPhoneRender(componentWithLargeText)).toMatchImageSnapshot(imageSnapshotConfig(`iPhone-responsive-${index}`));
        expect(await iPadRender(componentWithLargeText)).toMatchImageSnapshot(imageSnapshotConfig(`iPad-responsive-${index}`));
    });

});