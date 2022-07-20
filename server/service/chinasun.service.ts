import { Injectable } from '@nestjs/common';
import ProgramlistLoader from 'server/utils/ProgramListLoader.service';
import Common from '../utils/common';
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
        // nothing to do
    }
    
    async initialize({ XLSFOLDER_DIR }){
        
        this.xlsFolder = XLSFOLDER_DIR;
        await this.getLatestProgramList();

        const watcher = hound.watch(this.xlsFolder);

        watcher.on('create', async () => {

            this.getLatestProgramList();
        
        });

        watcher.on('change', async () => {

            this.getLatestProgramList();
        
        })

        return true;
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
        const now = new Date().getTime();
        return this.getProgramlistWithTimestamp(now);

    }

    //the function of getting updated data
    /**
     * return @param {string} result store the current yyyymmdd string
     */
     async getProgramlistWithTimestamp(timestamp) {   
        let result;
        const thisMonday = Common.getCurrentMonday(timestamp);
        const index = (thisMonday.getTime() / 1000).toString();
        // if programlist contains key named timestamp
        if(this.programList[index] == undefined) {
            result = await ProgramlistLoader.getProgramListWithTimestamp(this.xlsFolder, index);
            // ++ todo: check result
            this.programList[result["timestamp"]] = result["list"];
            return result || [];
        }
        else {
            return this.programList[index];
        }
    }
        
}

export default ChinasunService;

