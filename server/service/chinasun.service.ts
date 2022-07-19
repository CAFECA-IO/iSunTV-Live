import { Injectable } from '@nestjs/common';
import ProgramlistLoader from 'server/utils/ProgramListLoader.service';


/**
 * handle the programlist service for chinasun controller
 * @service ChinasunService
 */
@Injectable()
class ChinasunService {

    /** @param {string} xlsFolder default xls folder path*/
    xlsFolder: string;

    //the class constructor
    /**
     * set the default constructor without param
     */
    constructor() {

    }
    
    async initialize({XLSFOLDER_DIR}){
        
        this.xlsFolder = XLSFOLDER_DIR;
        const result = await ProgramlistLoader.getLatestProgramList(this.xlsFolder);
        console.log(result);

    }

    //the function of getting current time 
    /**
     * return @param {string} result store the current yyyymmdd string
     */
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
        var result = _year + _month + _day;

        return result;
    
    }

    //the function of getting updated data
    /**
     * return @param {string} result store the current yyyymmdd string
     */
    async getUpdatedData() {    
        
        const result = await ProgramlistLoader.getLatestProgramList(this.xlsFolder);
        global.playlist = result;
        return result;

    }
        
}

export default ChinasunService;

