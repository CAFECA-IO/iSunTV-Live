declare class FileOperator {
    private static Content;
    constructor();
    static getFileList(path: any): Promise<unknown>;
    static excelToJson(Sheet_buffer: any): any;
    static readFile(path: any): Promise<unknown>;
}
export default FileOperator;
