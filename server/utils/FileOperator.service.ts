import fs from 'fs';
import xlsx from 'xlsx';
import FileError from './FileError';

class FileOperator{

    private static Content: any;

    constructor() {
    
    }
// time - unixtimestamp
    static async getFileList(path) {
        // 改 arrow function
        return new Promise((resolve, reject) => {

            fs.readdir(path, (err, files) => {
                // err handling (add try catch)
                // 1. invalid path
                // 2. Folder can't be read
                if (err) {
                    if (err.code === 'ENOENT') {
                        reject(new FileError("08020001","invalid path"))
                    } else {
                        reject(new FileError("08020002","Folder can't be read"))
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
                    //ascending sort
                    return a.ctime - b.ctime; 
                })
                .map((v) => {
                    return v.name; 
                });
                // file crua time (建立等等時間紀錄)
                resolve(result);
            });
        });
    }

    static excelToJson(Sheet_buffer): any {
        this.Content = xlsx.utils.sheet_to_json(Sheet_buffer.Sheets[Sheet_buffer.SheetNames[0]]);
        return this.Content;
    }
    
    static async readFile(path) {
        let File;
        return new Promise((resolve, reject) => {
            try {
                File = xlsx.readFile(path,{type:'binary',cellDates:true})
                resolve(File);
            } catch(e) {
                // add code 編碼標準
                // code: 0802xxxx
                // 額外給一個 code
                // Error:
                // 1. invalid path
                // 2. File can't be read
                // error code , message
                if (e) {
                    if (e.code === 'ENOENT') {
                        reject(new FileError("08020001","invalid path"))
                    } else {
                        reject(new FileError("08020003","File can't be read"))
                    }
                }
            }
        });
    }   
}

export default FileOperator;