import { Injectable } from '@nestjs/common';
import fs from 'fs';
import { FormatterService } from './formatter.service';
import xlsx from 'xlsx';
// add Programlist loader 
@Injectable()
export class ChinasunService {

    jsonFile: string;
    xlsFolder: string;
    formatterService: FormatterService;

    constructor(){
        this.jsonFile = process.cwd()+'/playlist.json';
        this.xlsFolder = process.cwd()+'/xls';
        this.formatterService= new FormatterService;
    }
    
    // loop until get the data
    getCurrentTime(){

        var currentTime = new Date();
        var month = (currentTime.getMonth() + 1);
        var _month;

        // normalize the month
        if (month<10){
            _month = '0'+month.toString();
        }else{
            _month = month.toString();
        }
        
        var _day = currentTime.getDate().toString();
        var _year = currentTime.getFullYear().toString();
        
        return _year+_month+_day;
    
    }

    // timeFormatter(time):string{
    //     return time.slice(0, 4)+"-"+time.slice(4,6)+"-"+time.slice(6,8)
    // }
    jsonFormatter(data,message):any{
        var jsonFormat={
            data: data,
            message: message
        }
        return jsonFormat;
    }

    // getDefaultValue():any{
    //     var data = fs.readFileSync(this.jsonFile,{encoding:'utf8', flag:'r'});
    //     var data_json = JSON.parse(data);
    //     return this.jsonFormatter(data_json,"return default file")
    // }

    async getUpdatedData(){    

            // get current time 
            var now = new Date(this.getCurrentTime().slice(0, 4)+"-"+this.getCurrentTime().slice(4,6)+"-"+this.getCurrentTime().slice(6,8));
            var lastfileDate;
            var diff;
            var files;
            var jsonFormat={
                data: "",
                message: ""
            }
            // get the filename
            return new Promise(function(resolve, reject) {
    
                fs.readdir(process.cwd()+'/xls', function (err, filename) {

                    files = filename;
            
                // if the folder contains files
                var lastfile;
        
                if(files.length>0){
                    // get the latest file time
                    lastfile = files[files.length-1];
                    lastfile = lastfile.replace(" ","");
                    lastfile = lastfile.replace("chinasuntv.xls","");
                    lastfileDate = new Date(lastfile.slice(0, 4)+"-"+lastfile.slice(4,6)+"-"+lastfile.slice(6,8));
        
                    diff = Math.floor(Math.abs(now.getTime()-lastfileDate.getTime())/1000/60/60/24+0.5);
        
                    let File;
                    let Content; 
                    //check if it is the latest file(close to current time)
                        //read file until
                        for(let i = files.length-1 ; i >= 0;i--){
            
                            try{
                                File = xlsx.readFile(process.cwd()+'/xls/'+files[i],{type:'binary',cellDates:true});
                                Content = xlsx.utils.sheet_to_json(File.Sheets[File.SheetNames[0]]);
                                //check if it is the latest file(close to current time
                                if((i==files.length-1)&&(diff < 7)&&(diff >= 0)){
                                    jsonFormat.data=Content;
                                    jsonFormat.message="it's the latest data";
                                    resolve(jsonFormat);
                                    break;
                                }else{
                                    jsonFormat.data=Content;
                                    jsonFormat.message="it's not the latest data";
                                    console.log("it's not a latest data");
                                    resolve(jsonFormat);
                                    break;
                                }
                                
                            }catch(e) {
                                // if return read data error => loop
                                if(i===0) {
                                    // if we can't read the last file which can be read
                                    // -> readFile (change to the async type)
                                    var data = fs.readFileSync(process.cwd()+'/playlist.json',{encoding:'utf8', flag:'r'});
                                    var data_json = JSON.parse(data);
                                    jsonFormat.data = data_json;
                                    jsonFormat.message = "return default file";
                                    resolve(jsonFormat);
                                    break;
                                }
                                continue;
                            }
                    }  

                    }else{
                        // if the folder contains nothing
                        var data = fs.readFileSync(process.cwd()+'/playlist.json',{encoding:'utf8', flag:'r'});
                        var data_json = JSON.parse(data);
                        jsonFormat.data=data_json;
                        jsonFormat.message="return default file";
                        resolve(jsonFormat);
                    }
                });
                // handle the error (next schedule)
            });
        }
    
        // let File = xlsx.readFile(file,{type:'binary',cellDates:true});
        // let Content = xlsx.utils.sheet_to_json(File.Sheets[File.SheetNames[0]]);
        // let jsonFile=process.cwd()+'/playlist.json';

        // var data = fs.readFileSync(this.jsonFile,{encoding:'utf8', flag:'r'});
        // var data_json = JSON.parse(data);
        // if (typeof data_json != 'undefined'){
        //     return this.formatterService.FormatData(true,"00000000","Return Programlist Data",data_json);
        // }else{
        //     return this.formatterService.FormatData(false,"04999999","Return Programlist Data",data_json);
        // }
        
    }



