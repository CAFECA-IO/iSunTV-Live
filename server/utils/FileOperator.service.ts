import fs from 'fs';
import xlsx from 'xlsx';
import FileError from './FileError';
import {errorCode}  from './ErrorCode';
import {errorMessage}  from './ErrorMessage';

class FileOperator{

    private static File: any;
    constructor() {
    
    }

    /**
     * get the filelist with given options
     * @param path options to start the function with
     * @returns a promise resolved result when the function is ready to be called
     */
    static async getFileList(path) {

        return new Promise<any[]>((resolve, reject) => {

            fs.readdir(path, (err, files) => {
                // err handling (add try catch)
                // 1. invalid path
                // 2. Folder can't be read
                console.log(path);
                if (err) {
                
                    if (err.code === 'ENOENT') {
                
                        reject(new FileError(errorCode.invalidPathError,errorMessage.invalidPathError))
                
                    } else {
                
                        reject(new FileError(errorCode.folderNoReadError,errorMessage.folderNoReadError))
                
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

                resolve(result);
            });
        });
    }

    /**
     * transfer excelToJson with given options
     * @param sheetBuffer options to start the function with
     * @returns result when the transformation is completed
     */
    static excelToJson(sheetBuffer) {
        // transfer excel to json
        let result;
        result = xlsx.utils.sheet_to_json(sheetBuffer.Sheets[sheetBuffer.SheetNames[0]]);
        return result;

    }

    /**
     * readfile with given options
     * @param path options to start the function with
     * @returns a promise resolved result when the function is ready to be called
     */
    static async readFile(path) {

        return new Promise((resolve, reject) => {
            
            try {
                let File;
                File = xlsx.readFile(path, { type:'binary', cellDates:true } )
                resolve(File);
            
            } catch(e) {
                // Error:
                // 1. invalid path
                // 2. File can't be read
                // return custom error code , message
                if (e) {
            
                    if (e.code === 'ENOENT') {
            
                        reject(new FileError(errorCode.invalidPathError,errorMessage.invalidPathError))
            
                    } else {
            
                        reject(new FileError(errorCode.fileNotReadError,errorMessage.fileNotReadError))
            
                    }
                }
            }
        });
    }   

}

export default FileOperator;