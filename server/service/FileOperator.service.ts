import fs from 'fs';
import xlsx from 'xlsx';

class FileOperator{

    private static xlsFolder: string = process.cwd()+'/xls';

    constructor() {
    
    }

    static getFileList(path) {
        return new Promise(function(resolve, reject) {
            fs.readdir(path, function (err, filename) {
                // err handling
                return filename;
            });
        });
    }

    public static readFile(path) {
        let File;
        let Content;
        return new Promise(function(resolve, rejeact) {
            try{
                File = xlsx.readFile(path,{type:'binary',cellDates:true})
                Content = xlsx.utils.sheet_to_json(File.Sheets[File.SheetNames[0]]);
                resolve(Content);
            }catch(e){
                throw e;
            }
        });
    }   

}
export {FileOperator};