import FileOperator from './file_operator_service';
import FileError from './file_error';
import { ERROR_CODE } from '../constant/error_code';
import Common from './common';

type programList = {
    timestamp: string;
    list: object[];
};

type original_progrmalist = {
    prgID : string;
    prgName : string;
    PlayTime : string;
    prgColumn : string;
    prgComment : string;
};

class ProgramlistLoader {

    constructor() {
        // do nothing
    }

    /**
     * get the latest programlist with given options
     * @param path options to start the function with
     * @returns a promise resolved result when the function is ready to be called
     */
    static async getLatestProgramList(path: string): Promise<programList> {
        
        const fileList = await FileOperator.getFileList(path);
        let result;
        let fileIndex;
        fileIndex = fileList.length - 1;    

        do {
    
            try {
                result = await this.getProgramList(path + fileList[fileIndex].name);
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
    static async getProgramList(path: string): Promise<programList>{
        // define the result of the program
        const result = {
            timestamp: null,
            list: []         
        };
        // readfile -> transfer excel to json -> format the result and return it
        // Error:
        // 1. invalid path
        // 2. File can't be read
        const file = await FileOperator.readFile(path);
        const exceljson = await FileOperator.excelToJson(file);
        const program: any = exceljson[0];
        const programTimestamp = new Date(program["PlayTime"]).getTime();
        const programMonday = Common.getCurrentMonday(programTimestamp);
        const timeIndex = new Date(programMonday).getTime();

        result["timestamp"] = timeIndex;
        result["list"] = this.formatProgramList(exceljson);
        return result;
    }
    /**
     * get the programlist with given options
     * @param path options to start the function with
     * @returns a promise resolved result when the function is ready to be called
     */
     static async getProgramListWithUnixTimestamp(path: string, unixtimestamp: number): Promise<object[]> {

        let result;
        // change the unixtimestamp to monday date
        const currentMondayDate = Common.getCurrentMonday(unixtimestamp);
        // normalize monday date to local monday and ge the normalized monday date 'YYYYMMDD'
        const normalizedMondayDate = await Common.getFormatedDate(new Date(currentMondayDate.getTime()), 'YYYYMMDD');

        // readfile -> transfer excel to json -> format the result and return it
        // Error:
        // 1. invalid path
        // 2. File can't be read
        // unix time -> current date
        try {

            const filePath = path + normalizedMondayDate + "chinasuntv.xls";
            result = await this.getProgramList(filePath);

        } catch(e) {
            // throw invalid path error
            const error = new FileError(ERROR_CODE.NO_FILE_CAN_READ_ERROR, "no file can be read");
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
    static formatProgramList(data: any): original_progrmalist[]|[] {

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