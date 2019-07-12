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
    if (stylesheet.includes('.scss')) {
        try {
            var styles = sass.renderSync({
                file: stylesheet
            });
            return styles.css.toString();
        }
        catch (e) {
            throw new Error("Error when loading SCSS at path \"" + stylesheet + "\"");
        }
    }
    try {
        var styles = fs_1.readFileSync(stylesheet, 'utf8');
        return styles;
    }
    catch (e) {
        throw new Error("Error when loading CSS at path \"" + stylesheet + "\"");
    }
};
