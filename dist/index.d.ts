/// <reference types="react" />
/// <reference types="node" />
import { Device } from "puppeteer/DeviceDescriptors";
export interface Options {
    stylesheet?: string;
    renderer?: any;
    device?: Device;
    image?: {
        path?: string;
    };
}
export declare function generateImage(component: React.ReactElement, options: Options): Promise<Buffer>;
