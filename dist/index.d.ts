/// <reference types="react" />
import * as devices from 'puppeteer/DeviceDescriptors';
export interface InputOptions {
    stylesheet?: string;
    device?: devices.Device | string;
    bodyPadding?: number;
}
export interface Options {
    stylesheet: string;
    device: devices.Device | string;
    bodyPadding: number;
}
export declare const createDevice: (options: InputOptions) => (component: import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)> | null) | (new (props: any) => import("react").Component<any, any, any>)>) => Promise<string>;
export declare const render: (component: import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)> | null) | (new (props: any) => import("react").Component<any, any, any>)>, options: InputOptions) => Promise<string>;
