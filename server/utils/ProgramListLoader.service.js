"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FileOperator_service_1 = __importDefault(require("./FileOperator.service"));
const FileError_1 = __importDefault(require("./FileError"));
class ProgramlistLoader {
    constructor() {
    }
    static async getLatestProgramList(path) {
        const fileList = await FileOperator_service_1.default.getFileList(path);
        let result;
        this.lastFile = fileList;
        this.fileIndex = this.lastFile.length - 1;
        return new Promise(async (resolve, reject) => {
            do {
                try {
                    result = await FileOperator_service_1.default.readFile(this.lastFile[this.fileIndex]);
                    this.fileIndex = this.fileIndex - 1;
                    resolve(result);
                }
                catch (e) {
                    if (e.code === 'ENOENT') {
                        reject(new FileError_1.default("08020001", "invalid path"));
                    }
                    else {
                        console.log("inner_flag");
                        if (this.fileIndex == 0) {
                            reject(new FileError_1.default("08020004", "no json now"));
                        }
                    }
                }
            } while (this.fileIndex >= 0);
        });
    }
    static async getProgramList(path) {
        return new Promise(async (resolve, reject) => {
            try {
                const file = await FileOperator_service_1.default.readFile(path);
                const excelJson = await FileOperator_service_1.default.excelToJson(file);
                const result = this.formatProgramList(excelJson);
                resolve(result);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    static formatProgramList(data) {
        if (typeof data == 'undefined') {
            return [];
        }
        data.map((program) => {
            if (typeof program.prgID == 'undefined') {
                program.prgID = null;
            }
            else if (typeof program.PlayTime == 'undefined') {
                program.PlayTime = null;
            }
            else if (typeof program.prgComment == 'undefined') {
                program.prgComment = null;
            }
            return {
                prgID: program.prgID,
                prgName: program.prgName,
                PlayTime: program.PlayTime,
                prgColumn: program.prgColumn,
                prgComment: program.prgComment,
            };
        });
    }
}
exports.default = ProgramlistLoader;
//# sourceMappingURL=ProgramListLoader.service.js.map