"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
exports.parseStyleSheet = function (stylesheet) {
    try {
        var styles = fs_1.readFileSync(stylesheet, 'utf8');
        return styles;
    }
    catch (e) {
        return '';
    }
};
//# sourceMappingURL=parseStyleSheet.js.map