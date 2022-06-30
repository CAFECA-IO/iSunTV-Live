import { Injectable } from '@nestjs/common';
import ProgramlistLoader from 'server/utils/ProgramListLoader.service';
// import { FormatterService } from './formatter.service';

// add Programlist loader 
@Injectable()
class ChinasunService {

    jsonFile: string;
    // json playlist
    xlsFolder: string;

    constructor() {

    }
    
    // loop until get the data
    getCurrentTime() {

        var currentTime = new Date();
        var month = (currentTime.getMonth() + 1);
        var _month;

        // normalize the month
        if (month < 10) {

            _month = '0'+month.toString();
        
        } else {
        
            _month = month.toString();
        
        }
        
        var _day = currentTime.getDate().toString();
        var _year = currentTime.getFullYear().toString();

        return _year+_month+_day;
    
    }

    async getUpdatedData() {    

        const time = this.getCurrentTime();
        const result = await ProgramlistLoader.getLatestProgramList(this.xlsFolder);
        return result;

    }
        
}

export default ChinasunService;

