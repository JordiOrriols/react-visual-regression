'use strict';

import { JSDOM } from 'jsdom';
import ReactDOM from 'react-dom';

export const reactVirtualRenderer = (component: React.ReactElement): HTMLDivElement => {

    const jsDomElement = new JSDOM('<!DOCTYPE html><div id="root"></div>');
    const asAny: any = jsDomElement.window.Document as any;
    const document: HTMLDocument = asAny as HTMLDocument;

    const container = document.createElement('div');
    container.id = 'root';
    document.body.appendChild(container);

    ReactDOM.render(component, container);

    return container;
};
