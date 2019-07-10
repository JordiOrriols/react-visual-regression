/// <reference types="react" />
import { Device } from "puppeteer/DeviceDescriptors";
export interface Options {
    stylesheet?: string;
    device?: Device;
}
export declare function createDevice(options: Options): (component: React.ReactElement) => Promise<string>;
export declare function render(component: React.ReactElement, options: Options): Promise<string>;
