import FileOperator from './FileOperator.service';
import FileError from './FileError';

class ProgramlistLoader{
// 放置所有的 param
    private static lastFile: any;
    private static fileIndex: number;
    constructor() {

    }
    
    //get last file with specific path
    static async getLatestProgramList(path) {
        // await
        const fileList = await FileOperator.getFileList(path);
        let result;
        this.lastFile = fileList;      

            // 先排序再 do while loop 到拿到 programlist / 無檔案可拿為止
            // call getprogramlist-> if []/fail do again
            this.fileIndex = this.lastFile.length - 1;    
            return new Promise(async (resolve, reject) =>{
                    do {
                        try {
                            result = await FileOperator.readFile(this.lastFile[this.fileIndex]);         
                            //->result
                            this.fileIndex = this.fileIndex-1;
                            resolve(result);
                        } catch(e) {
                            if (e.code === 'ENOENT'){
                                reject(new FileError("08020001","invalid path"))   
                            }else{
                                // if file can't be read
                                console.log("inner_flag")
                                if (this.fileIndex==0) {
                                    reject(new FileError("08020004","no json now"))
                                }
                            }
                            
                        }
                    } while (this.fileIndex >= 0);
                });
            }
        
    // with specific file path?
    static async getProgramList(path) {
        // Error:
        // 1. invalid path
        // 2. File can't be read
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
        
        // no invalid data
        // invalid(無法解析) => return []
        if (typeof data == 'undefined'){
            return [];
        }

        data.map((program) => {
            
            if(typeof program.prgID == 'undefined') {
                program.prgID = null;
            } else if(typeof program.PlayTime == 'undefined') {
                program.PlayTime = null;
            } else if(typeof program.prgComment == 'undefined') {
                program.prgComment = null;
            }

            return {
                prgID: program.prgID,
                prgName: program.prgName,
                PlayTime: program.PlayTime,
                prgColumn: program.prgColumn,
                prgComment: program.prgComment,
            };
          })

    }
}

export default ProgramlistLoader;