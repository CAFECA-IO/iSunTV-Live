import { Injectable } from '@nestjs/common';
import ProgramlistLoader from 'server/utils/ProgramListLoader.service';
import moment from 'moment';
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
    constructor() {

    }
    
    async initialize({XLSFOLDER_DIR}){
        
        this.xlsFolder = XLSFOLDER_DIR;
        let result = {};

        result = await ProgramlistLoader.getLatestProgramList(this.xlsFolder);
        // result.timstamp
        // result.list
        // register the watcher
        const watcher = hound.watch(process.cwd() + this.xlsFolder);

        watcher.on('create', async () => {

            this.getLatestProgramList();
        
        });

        watcher.on('change', async () => {

            this.getLatestProgramList();
        
        })
        // only one timestamp
        this.programList[result["timestamp"]] = result["list"];

    }

    async getLatestProgramList() {
        const result = await ProgramlistLoader.getLatestProgramList(this.xlsFolder);
        this.programList[result["timestamp"]] = result["list"];
        return true;
    }

    //the function of getting updated data
    /**
     * return @param {string} result store the current yyyymmdd string
     */
    async getProgramlist() {    

        // timestamp now
        const currentDate = new Date();
        // console.log(timestamp);
        // console.log(CERTAIN_DATE);
        const dateOfThisMonday = currentDate.getDate() - currentDate.getDay() + 1 ;
        const thisMonday = new Date(currentDate.setDate(dateOfThisMonday));
        // normalize monday date
        const normalizedMondayDate = moment(new Date(thisMonday)).format('YYYY-MM-DD');
        const unitimestampOfThisMonday = Math.floor(new Date(normalizedMondayDate).getTime()/1000);

        // no data now
        return this.getProgramlistWithTimestamp(unitimestampOfThisMonday);

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
            // ++ todo: check result
            this.programList[result["timestamp"]] = result["list"];
            return this.programList[MONDAY_UNIX_TIME] || [];
        }

    }
        
}

export default ChinasunService;

