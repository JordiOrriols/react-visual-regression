'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsdom_1 = require("jsdom");
var react_dom_1 = __importDefault(require("react-dom"));
exports.reactVirtualRenderer = function (component) {
    var jsDomElement = new jsdom_1.JSDOM('<!DOCTYPE html><div id="root"></div>');
    var asAny = jsDomElement.window.Document;
    var document = asAny;
    var container = document.createElement('div');
    container.id = 'root';
    document.body.appendChild(container);
    react_dom_1.default.render(component, container);
    return container;
};
