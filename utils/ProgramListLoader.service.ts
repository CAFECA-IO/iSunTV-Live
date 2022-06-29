import FileOperator from './FileOperator.service';
import fs from 'fs';
import xlsx from 'xlsx';

class ProgramlistLoader{
// 放置所有的 param
    private static LastFile: any;
    constructor() {

    }
    
    //get last file with specific path
    static async getLatestProgramList(path) {
        // await
        const fileList = await FileOperator.getFileList(path);
        this.LastFile = fileList;      

            // 先排序再 do while loop 到拿到 programlist / 無檔案可拿為止
            // call getprogramlist-> if []/fail do again

                return new Promise(async (resolve, reject) =>{

                    try {
                        const result = await FileOperator.readFile(this.LastFile[this.LastFile.length-1]);
                        //->result
                        resolve(result);
                    } catch(e) {
                        throw e;
                    }

                });
            }
        
    // with specific file path?
    static async getProgramList(path) {
        // Error:
        // 1. invalid path
        // 2. File can't be read
        let Content; //->移到最開頭
        return new Promise( async (resolve, reject) => {
            try {
                const file = await FileOperator.readFile(path);//  add wait
                const excelJson = await FileOperator.excelToJson(file);
                const result = this.formatProgramList(excelJson);
                //exceltojson->Format->ouput

                // Content = xlsx.utils.sheet_to_json(Sheet_buffer.Sheets[Sheet_buffer.SheetNames[0]]);

                // formatProgramlist

                // 統一稱為 result
                resolve(result);
            } catch(e) {
                reject(e);
            }
        });        
    }
    
    static formatProgramList(data) {
        //format the data(待確認)
        // {
        //     "prgID": null,
        //     "prgName": "解碼區塊鏈",
        //     "PlayTime": "5\/23\/22 0:01",
        //     "prgColumn": "訪談",
        //     "prgComment": null
        //    }
        // 解不出來=null
        var jsonFormat = {
            "prgID": null,
            "prgName": "解碼區塊鏈",
            "PlayTime": "5\/23\/22 0:01",
            "prgColumn": "訪談",
            "prgComment": null            
        }
        // no invalid data
        // invalid(無法解析) => return []
        return jsonFormat;
    }
}

export default ProgramlistLoader;