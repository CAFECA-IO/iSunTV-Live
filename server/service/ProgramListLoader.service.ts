import {FileOperator} from '../service/FileOperator.service';

class ProgramlistLoader{

    constructor() {

    }
    
    //get last file with specific path
    static getLatestProgramList(path) {
        let LastFile;
        FileOperator.getFileList(path).then(
            (value)=>{
                LastFile=value;
                return new Promise(function(resolve, reject) {
                    try{
                        const Sheet_json = FileOperator.readFile(LastFile[LastFile.length-1]);
                        resolve(Sheet_json);
                    }catch(e){
                        throw e;
                    }
                });
            }
        ) 
    }
    // with specific file path?
    static getProgramList(path) {
        return new Promise(function(resolve, reject) {
            try{
                const Sheet_json = FileOperator.readFile(path);
                resolve(Sheet_json);
            }catch(e){
                throw e;
            }
        });        
    }
    
    static formatProgramList(data,message) {
        var jsonFormat={
            data: data,
            message: message
        }
        return jsonFormat;
    }
}