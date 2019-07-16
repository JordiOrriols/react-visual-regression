"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reactVirtualRenderer_1 = require("./reactVirtualRenderer");
exports.renderComponent = function (component) {
    var renderedComponent = reactVirtualRenderer_1.reactVirtualRenderer(component);
    return renderedComponent.outerHTML;
};
