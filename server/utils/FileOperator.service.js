"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const xlsx_1 = __importDefault(require("xlsx"));
const FileError_1 = __importDefault(require("./FileError"));
class FileOperator {
    constructor() {
    }
    static async getFileList(path) {
        return new Promise((resolve, reject) => {
            fs_1.default.readdir(path, (err, files) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        reject(new FileError_1.default("08020001", "invalid path"));
                    }
                    else {
                        reject(new FileError_1.default("08020002", "Folder can't be read"));
                    }
                }
                const result = files.map((fileName) => {
                    return {
                        name: fileName,
                        atime: fs_1.default.statSync(path + '/' + fileName).atime.getTime(),
                        birthtime: fs_1.default.statSync(path + '/' + fileName).birthtime.getTime(),
                        mtime: fs_1.default.statSync(path + '/' + fileName).mtime.getTime(),
                        ctime: fs_1.default.statSync(path + '/' + fileName).ctime.getTime(),
                    };
                })
                    .sort((a, b) => {
                    return a.ctime - b.ctime;
                })
                    .map((v) => {
                    return v.name;
                });
                console.log(result);
                resolve(result);
            });
        });
    }
    static excelToJson(Sheet_buffer) {
        this.Content = xlsx_1.default.utils.sheet_to_json(Sheet_buffer.Sheets[Sheet_buffer.SheetNames[0]]);
        return this.Content;
    }
    static async readFile(path) {
        let File;
        return new Promise((resolve, reject) => {
            try {
                File = xlsx_1.default.readFile(path, { type: 'binary', cellDates: true });
                resolve(File);
            }
            catch (e) {
                if (e) {
                    if (e.code === 'ENOENT') {
                        reject(new FileError_1.default("08020001", "invalid path"));
                    }
                    else {
                        reject(new FileError_1.default("08020003", "File can't be read"));
                    }
                }
            }
        });
    }
}
exports.default = FileOperator;
//# sourceMappingURL=FileOperator.service.js.map