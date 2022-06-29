import { CustomError } from 'ts-custom-error';
declare class FileError extends CustomError {
    code: string;
    constructor(code: string, message?: string);
}
export default FileError;
