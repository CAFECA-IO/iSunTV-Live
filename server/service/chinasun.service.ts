import { Injectable } from '@nestjs/common';
import ProgramlistLoader from 'server/utils/ProgramListLoader.service';
import moment from 'moment';
import { ConfigService } from '@nestjs/config';
import * as hound from 'hound';

/**
 * handle the programlist service for chinasun controller
 * @service ChinasunService
 */
@Injectable()
class ChinasunService {

    /** @param {string} xlsFolder default xls folder path*/
    xlsFolder: string;
    // add json param
    programList = {};
    //the class constructor
    /**
     * set the default constructor without param
     */
    constructor(private configService: ConfigService) {

    } 
    
    
    async initialize({XLSFOLDER_DIR}){
        
        this.xlsFolder = XLSFOLDER_DIR;
        let result = {};
        result = await ProgramlistLoader.getLatestProgramList(this.xlsFolder);
        // result.timstamp
        // result.list
        // register the watcher
        const watcher = hound.watch(process.cwd() + this.configService.get('XLSFOLDER_DIR'));

        watcher.on('create', async (file, stats) => {

            result = await ProgramlistLoader.getLatestProgramList(this.xlsFolder);    
        
        });

        watcher.on('change', async (file, stats) => {

            result = await ProgramlistLoader.getLatestProgramList(this.xlsFolder);   
        
        })
        // only one timestamp
        this.programList[result["timestamp"]] = result["list"];
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
    async getProgramlist() {    

        // if no data now, store the latest data we have
        if (Object.keys(this.programList).length === 0) {
            // but getLatestProgramList use for loop
            const result = await ProgramlistLoader.getLatestProgramList(this.xlsFolder);
            this.programList[result["timestamp"]] = result["list"];
        
        } 
        // timestamp now

        return this.programList;

    }

    //the function of getting updated data
    /**
     * return @param {string} result store the current yyyymmdd string
     */
     async getProgramlistWithTimestamp(timestamp) {   

        const CERTAIN_DATE = new Date(parseInt(timestamp)*1000);
        const DIFF_TO_MONDAY = CERTAIN_DATE.getDate() - CERTAIN_DATE.getDay() + 1 ;
        const CURRENT_MONDAY_DATE = new Date(CERTAIN_DATE.setDate(DIFF_TO_MONDAY));
        // normalize monday date
        const NORMALIZED_MONDAY_DATE = moment(new Date(CURRENT_MONDAY_DATE)).format('YYYYMMDD');
        const MONDAY_UNIX_TIME = Math.floor((new Date(NORMALIZED_MONDAY_DATE).getTime())/1000)
        // if programlist contains key named timestamp
        if(Object.prototype.hasOwnProperty.call(this.programList, MONDAY_UNIX_TIME)) {

            return this.programList[MONDAY_UNIX_TIME];
        
        } else {
        
            const result = await ProgramlistLoader.getProgramListWithTimestamp(this.xlsFolder, timestamp);
            this.programList[result["timestamp"]] = result["list"];
        }

        // need to be continued

        return this.programList;

    }
        
}

export default ChinasunService;

