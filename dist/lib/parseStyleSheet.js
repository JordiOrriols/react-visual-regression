"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var sass = __importStar(require("node-sass"));
exports.parseStyleSheet = function (stylesheet) {
    if (!stylesheet)
        return '';
    var stylesheetArray;
    if (!Array.isArray(stylesheet))
        stylesheetArray = [stylesheet];
    else
        stylesheetArray = stylesheet;
    return stylesheetArray.map(getStylesFromFile).join();
};
var getStylesFromFile = function (stylesheet) {
    return (stylesheet.includes('.scss')) ? loadSCSSFile(stylesheet) : loadCSSFile(stylesheet);
};
var loadSCSSFile = function (stylesheet) {
    try {
        var styles = sass.renderSync({
            file: stylesheet
        });
        return styles.css.toString();
    }
    catch (e) {
        console.error("Error when loading SCSS at path \"" + stylesheet + "\"");
        return '';
    }
};
var loadCSSFile = function (stylesheet) {
    try {
        return fs_1.readFileSync(stylesheet, 'utf8');
    }
    catch (e) {
        console.error("Error when loading CSS at path \"" + stylesheet + "\"");
        return '';
    }
};
