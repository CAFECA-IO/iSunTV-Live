import FileOperator from './FileOperator.service';
import FileError from './FileError';

class ProgramlistLoader {

    constructor() {

    }

    /**
     * get the latest programlist with given options
     * @param path options to start the function with
     * @returns a promise resolved result when the function is ready to be called
     */
    static async getLatestProgramList(path) {
        
        let fileList = await FileOperator.getFileList(path);      
        let fileIndex;
        fileIndex = fileList.length - 1;    
        console.log(fileIndex);
        return new Promise(async (resolve, reject) => {
            // do while loop until programlist can be read or no file can be read        
            do {
        
                try {
                    const result = await this.getProgramList(path+fileList[fileIndex].name);
                    fileIndex = fileIndex - 1;
                    resolve(result);
                    break;
            
                } catch(e) {
                    // throw invalid path error
                    if (e.code === 'ENOENT') {
            
                        reject(new FileError("08020002","invalid path"))   
            
                    } else {
                        // call getprogramlist-> if []/fail do again
                        // while loop continue here
                        // if read the last file -> throw the no file can be read error
                        if (fileIndex == -1) {

                            reject(new FileError("08020005","no file can be read"))
                        
                        }

                    }                    
                    
                }
                
            } while (fileIndex >= 0);
        
        });
    
    }
        
    /**
     * get the programlist with given options
     * @param path options to start the function with
     * @returns a promise resolved result when the function is ready to be called
     */
    static async getProgramList(path) {
        // readfile -> transfer excel to json -> format the result and return it
        // Error:
        // 1. invalid path
        // 2. File can't be read
        return new Promise<any[]>( async (resolve, reject) => {
            // 
            try {
                console.log(path);
                const file = await FileOperator.readFile(path);//  add wait
                const excelJson = await FileOperator.excelToJson(file);
                const result = this.formatProgramList(excelJson);
                console.log(path);
                resolve(result);
    
            } catch(e) {
    
                reject(e);
    
            }
    
        });        
    }

    /**
     * original data resource is already formatted,
     * so this function is used to deal with the undefined condition 
     * get the programlist with given options
     * @param data options to start the function with
     * @returns formatted data without undefined
     */   
    static formatProgramList(data) {

        // invalid(無法解析) => return []
        if (typeof data == 'undefined') {

            return [];
    
        }

        // assign the programlist to the formatted json with null
        const result = data.map((program) => {

            let jsonFormat = {

                prgID: "",
                prgName: "",
                PlayTime: "",
                prgColumn: "",
                prgComment: "",
    
            }
            // deal with normal program assigment
            jsonFormat.prgID = program.prgID;
            jsonFormat.prgName = program.prgName;
            jsonFormat.PlayTime = program.PlayTime;
            jsonFormat.prgColumn = program.prgColumn;
            jsonFormat.prgComment = program.prgComment;

            // deal with undefinend
            if(typeof program.prgID == 'undefined') {
    
                jsonFormat.prgID = null;
    
            } else if(typeof program.PlayTime == 'undefined') {
    
                program.PlayTime = null;
    
            } else if(typeof program.prgComment == 'undefined') {
    
                program.prgComment = null;
    
            }

            return jsonFormat;
        });

        return result;
    
    }

}

export default ProgramlistLoader;