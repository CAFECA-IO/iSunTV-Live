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
    
    async initialize({XLSFOLDER_DIR}) {
        
        this.xlsFolder = XLSFOLDER_DIR;
        let result = {};

        result = await ProgramlistLoader.getLatestProgramList(this.xlsFolder);

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
        const currentUnitimestamp = Math.floor(new Date().getTime()/1000);
        // console.log(timestamp);
        // console.log(CERTAIN_DATE);
        // const dateOfThisMonday = currentDate.getDate() - currentDate.getDay() + 1 ;
        // const thisMonday = new Date(currentDate.setDate(dateOfThisMonday));
        // // normalize monday date
        // const normalizedMondayDate = moment(new Date(thisMonday)).format('YYYY-MM-DD');
        // const unitimestampOfThisMonday = Math.floor(new Date(normalizedMondayDate).getTime()/1000);

        // no data now
        return this.getProgramlistWithTimestamp(currentUnitimestamp);

    }

    //the function of getting updated data
    /**
     * return @param {string} result store the current yyyymmdd string
     */
     async getProgramlistWithTimestamp(timestamp) {   

        const currentDate = new Date(parseInt(timestamp)*1000);
        const dateOfThisMonday = currentDate.getDate() - currentDate.getDay() + 1 ;
        const thisMonday = new Date(currentDate.setDate(dateOfThisMonday));
        // normalize monday date
        const normalizedMondayDate = moment(new Date(thisMonday)).format('YYYYMMDD');
        const unitimestampOfThisMonday = Math.floor((new Date(normalizedMondayDate).getTime())/1000)

        // if programlist contains key named timestamp
        if(Object.prototype.hasOwnProperty.call(this.programList, unitimestampOfThisMonday)) {

            return this.programList[unitimestampOfThisMonday];
        
        } else {
        
            const result = await ProgramlistLoader.getProgramListWithTimestamp(this.xlsFolder, timestamp);
            // ++ todo: check result
            this.programList[result["timestamp"]] = result["list"];
            return this.programList[unitimestampOfThisMonday] || [];
        }

    }
        
}

export default ChinasunService;

