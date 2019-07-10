"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("react-dom/server"));
exports.renderComponent = function (component) {
    try {
        var renderedComponent = server_1.default.renderToStaticMarkup(component);
        return renderedComponent;
    }
    catch (e) {
        throw Error('Not a valid React component');
    }
};
