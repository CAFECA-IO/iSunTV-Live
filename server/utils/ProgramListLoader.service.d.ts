declare class ProgramlistLoader {
    private static lastFile;
    private static fileIndex;
    constructor();
    static getLatestProgramList(path: any): Promise<unknown>;
    static getProgramList(path: any): Promise<unknown>;
    static formatProgramList(data: any): any[];
}
export default ProgramlistLoader;
