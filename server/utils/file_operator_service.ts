import fs from 'fs';
import xlsx from 'xlsx';
import FileError from './file_error';
import { ERROR_CODE }  from '../constant/error_code';

type fileJson = {
    name: string;
    atime: number;
    birthtime: number;
    mtime: number;
    ctime: number;
};

class FileOperator{

    constructor() {
        // nothing to do
    }

    /**
     * get the filelist with given options
     * @param path options to start the function with
     * @returns a promise resolved result when the function is ready to be called
     */
    static async getFileList(path: string): Promise<fileJson[]> {

        return new Promise<fileJson[]>(() => {

            fs.readdir(path, (err, files) => {
                // err handling (add try catch)
                // 1. invalid path
                // 2. Folder can't be read

                if (err) {
                
                    if (err.code === 'ENOENT') {
                
                        new FileError(ERROR_CODE.INVALID_PATH_ERROR,"invalid path")
                
                    } else {
                
                        new FileError(ERROR_CODE.FOLDER_NO_READ_ERROR,"Folder can't be read")
                
                    }
                }

                const result = files.map((fileName) => {

                    return {
                        name: fileName,
                        atime: fs.statSync(path + '/' + fileName).atime.getTime(),
                        birthtime: fs.statSync(path + '/' + fileName).birthtime.getTime(),
                        mtime: fs.statSync(path + '/' + fileName).mtime.getTime(),
                        ctime: fs.statSync(path + '/' + fileName).ctime.getTime(),
                    };

                })
                .sort((a, b) => {
                    //sort
                    return a.ctime - b.ctime; 
                
                })

                return(result);
            });
        });
    }

    /**
     * transfer excelToJson with given options
     * @param sheetBuffer options to start the function with
     * @returns result when the transformation is completed
     */
    static excelToJson(sheetBuffer: any): any {
        // transfer excel to json
        const result = xlsx.utils.sheet_to_json(sheetBuffer.Sheets[sheetBuffer.SheetNames[0]]);
        return result;

    }

    /**
     * readfile with given options
     * @param path options to start the function with
     * @returns a promise resolved result when the function is ready to be called
     */
    static async readFile(path: string): Promise<any> {
        let file;
        try {
            file = xlsx.readFile(path, { type:'binary', cellDates:true } )
        } catch(e) {
            // Error:
            // 1. invalid path
            // 2. File can't be read
            // return custom error code , message
            if (e) {
                let error;
                if (e.code === 'ENOENT') {
        
                    error = new FileError(ERROR_CODE.INVALID_PATH_ERROR,"invalid path");
                    throw error;
        
                } else {
        
                    error = new FileError(ERROR_CODE.FILE_NOT_READ_ERROR,"File can't be read");
                    throw error;

                }
            }
        }

        return file;
    }   

}

export default FileOperator;