import FileOperator from './FileOperator.service';
import FileError from './FileError';
import { ERROR_CODE } from './ErrorCode';
import moment from 'moment';

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
            
                        reject(new FileError(ERROR_CODE.INVALID_PATH_ERROR,"invalid path"))   
            
                    } else {
                        // call getprogramlist-> if []/fail do again
                        // while loop continue here
                        // if read the last file -> throw the no file can be read error
                        if (fileIndex == -1) {

                            reject(new FileError(ERROR_CODE.FILE_NOT_READ_ERROR,"no file can be read"))
                        
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

                // deal with the files and transfer the excel to json
                const FILE = await FileOperator.readFile(path);
                const EXCELJSON = await FileOperator.excelToJson(FILE);
                
                // check the program is in this week 
                const PROGRAM_DATE = moment(new Date(EXCELJSON[0].PlayTime)).format("YYYY-MM-DD");
                const TODAY = new Date(Date.now());
                const DIFF_TO_MONDAY = TODAY.getDate() - TODAY.getDay() + 1 ;
                const CURRENT_MONDAY_DATE = new Date(TODAY.setDate(DIFF_TO_MONDAY));
                // normalize the day to weekday needed to be pushed to weeklist
                const NORMALIZED_MONDAY_DATE = moment(new Date(CURRENT_MONDAY_DATE)).format('YYYY-MM-DD');

                let result;

                // if the first date != date of monday this week => return null data
                if (NORMALIZED_MONDAY_DATE !== PROGRAM_DATE) {

                    result = this.formatProgramList(null);
                
                } else {
                
                    result = this.formatProgramList(EXCELJSON);
                
                }
                
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
        if (typeof data == 'undefined' || data === null) {

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