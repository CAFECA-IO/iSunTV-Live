"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_custom_error_1 = require("ts-custom-error");
class FileError extends ts_custom_error_1.CustomError {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}
exports.default = FileError;
//# sourceMappingURL=FileError.js.map