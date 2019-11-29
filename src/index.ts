import { MatchImageSnapshotOptions } from 'jest-image-snapshot';
import * as devices from 'puppeteer/DeviceDescriptors';

import { renderTemplate } from './lib/renderTemplate';
import { defaultDevice, takeScreenshot } from './lib/takeScreenshot';

export interface InputOptions {
  stylesheet?: string | string[];
  device?: devices.Device | string;
  bodyPadding?: number;
}

export interface Options {
  stylesheet: string | string[];
  device: devices.Device | string;
  bodyPadding: number;
}

const defaultOpts: Options = {
  stylesheet: '',
  device: defaultDevice,
  bodyPadding: 10
};

export const createDevice = (options: InputOptions): (component: React.ReactElement) => Promise<string> => {
  return async (component: React.ReactElement): Promise<string> => {
    return render(component, options);
  };
};

export const render = async (component: React.ReactElement, options: InputOptions): Promise<string> => {

  const opts: Options = { ...defaultOpts, ...options };

  const template = await renderTemplate(
    component,
    opts.stylesheet,
    opts.bodyPadding
  );

  return takeScreenshot(template, opts);

};

const usedNames: string[] = [];

export const imageSnapshotConfig = (customSnapshotIdentifier: string): MatchImageSnapshotOptions => {
    if (usedNames.indexOf(customSnapshotIdentifier) !== -1) {
        throw new Error(`Error: The name '${customSnapshotIdentifier}' for the snapshot is already used.`);
    }
    usedNames.push(customSnapshotIdentifier);

    return {
        customSnapshotIdentifier
    };
};
