import { Injectable } from '@nestjs/common';
import ProgramlistLoader from 'utils/ProgramListLoader.service';
// import { FormatterService } from './formatter.service';

// add Programlist loader 
@Injectable()
export class ChinasunService {

    private static jsonFile: string = process.cwd()+'/playlist.json';
    // json playlist
    private static xlsFolder: string = process.cwd()+'/xls';

    constructor(){

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

    async getUpdatedData(){    
        const time = this.getCurrentTime;
        console.log(time);
        const jsons = await ProgramlistLoader.getLatestProgramList(ChinasunService.xlsFolder);
        console.log(jsons);
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



