import FileOperator from './FileOperator.service';
import FileError from './FileError';
import { ERROR_CODE } from './ErrorCode';
import Common from './common';

class ProgramlistLoader {

    constructor() {
        // do nothing
    }

    /**
     * get the latest programlist with given options
     * @param path options to start the function with
     * @returns a promise resolved result when the function is ready to be called
     */
    static async getLatestProgramList(path) {
        
        const fileList = await FileOperator.getFileList(path);
        let result;
        let fileIndex;
        fileIndex = fileList.length - 1;    
     
        do {
    
            try {
                result = await this.getProgramList(path+fileList[fileIndex].name);
                fileIndex = fileIndex - 1;
                break;
        
            } catch(e) {
                // throw invalid path error
                let error;
                if (e.code === 'ENOENT') {
                    error = new FileError(ERROR_CODE.INVALID_PATH_ERROR, "invalid path");
                    throw error;
                } else {
                    // call getprogramlist-> if []/fail do again
                    // while loop continue here
                    // if read the last file -> throw the no file can be read error
                    if (fileIndex == -1) {
                        error = new FileError(ERROR_CODE.FILE_NOT_READ_ERROR, "no file can be read");
                        throw error;
                    }
                }
            }
            
        } while (fileIndex >= 0);
        return result;
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
        const result = {};
        const file = await FileOperator.readFile(path);
        const exceljson = await FileOperator.excelToJson(file);
        const program:any = exceljson[0];
        const programTimestamp = new Date(program.playTime).getTime();
        const programMonday = Common.getCurrentMonday(programTimestamp);
        const timeIndex = new Date(programMonday).getTime() / 1000;
        result["timestamp"] = timeIndex;
        result["list"] = this.formatProgramList(exceljson);
        console.log(timeIndex, programTimestamp, programMonday)
        return result;
    }
    /**
     * get the programlist with given options
     * @param path options to start the function with
     * @returns a promise resolved result when the function is ready to be called
     */
     static async getProgramListWithTimestamp(path, timestamp) {
        // readfile -> transfer excel to json -> format the result and return it
        // Error:
        // 1. invalid path
        // 2. File can't be read
        // unix time -> current date
        let result;
        const unixtimestamp = timestamp * 1000;
        const CERTAIN_DATE = new Date(unixtimestamp);
        console.log(timestamp);
        console.log(CERTAIN_DATE);

        const CURRENT_MONDAY_DATE = Common.getCurrentMonday(CERTAIN_DATE);
        // normalize monday date
        const NORMALIZED_MONDAY_DATE = Common.getFormatedDate(new Date(CURRENT_MONDAY_DATE), 'YYYYMMDD');
        console.log(NORMALIZED_MONDAY_DATE);

        try {

            result = await this.getProgramList(path+NORMALIZED_MONDAY_DATE+"chinasuntv.xls");
            result["timestamp"] = timestamp;
            result["list"] = this.formatProgramList(result);

        } catch(e) {
            // throw invalid path error
            const error = new FileError(ERROR_CODE.NO_FILE_CAN_READ_ERROR,"no file can be read");
            throw error;
        }
        return result;               
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

            const jsonFormat = {

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