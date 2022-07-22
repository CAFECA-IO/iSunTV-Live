import { Injectable } from '@nestjs/common';
import ProgramlistLoader from 'server/utils/program_list_loader_service';
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
    
    async initialize(XLSFOLDER_DIR: string): Promise<boolean> {
        
        this.xlsFolder = XLSFOLDER_DIR;
        await this.getLatestProgramList();

        // set the watcher here, if the watcher start, call getLatestProgramList() to store the result 
        const watcher = hound.watch(this.xlsFolder);

        watcher.on('create', async () => {

            this.getLatestProgramList();
        
        });

        watcher.on('change', async () => {

            this.getLatestProgramList();
        
        })

        return true;
    }

    async getLatestProgramList(): Promise<boolean> {

        const result = await ProgramlistLoader.getLatestProgramList(this.xlsFolder);
        this.programList[result["timestamp"]] = result["list"];
        return true;
    
    }

    //the function of getting updated data
    /**
     * return @param {string} result store the current yyyymmdd string
     */
    async getProgramlist(): Promise<object[]> {    

        // timestamp now
        const now = Math.floor(new Date().getTime() / 1000);
        return this.getProgramlistWithTimestamp(now);

    }

    //the function of getting updated data
    /**
     * return @param {string} result store the current yyyymmdd string
     */
     async getProgramlistWithTimestamp(timestamp: number): Promise<object[]> {   

        let result;
        // unitimetstamp
        const unixtimestamp = timestamp * 1000;
        const thisMonday = Common.getCurrentMonday(unixtimestamp);
        const index = Math.floor(thisMonday.getTime() / 1000);

        // if programlist contains key named timestamp
        if(this.programList[index] == undefined) {

            result = await ProgramlistLoader.getProgramListWithTimestamp(this.xlsFolder, index);
            this.programList[result["timestamp"]] = result["list"];

            return result || [];
        }
        else {
            return this.programList[index];
        }
    }
        
}

export default ChinasunService;

