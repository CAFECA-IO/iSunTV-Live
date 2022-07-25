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

        // use now timestamp to get now programlist
        const now = new Date().getTime();
        return this.getProgramlistWithUnixTimestamp(now);

    }

    //the function of getting updated data
    /**
     * return @param {string} result store the current yyyymmdd string
     */
     async getProgramlistWithUnixTimestamp(unixtimestamp: number): Promise<object[]> {   

        let result;
        // get unixtimestamp of thisMonday to set the key
        const thisMonday = Common.getCurrentMonday(unixtimestamp);

        // if no this timestamp as key be stored in the parameter (this.programlist)
        if(this.programList[thisMonday.getTime()] == undefined) {
            // load the data and get the programlist
            // set list in programlist
            result = await ProgramlistLoader.getProgramListWithUnixTimestamp(this.xlsFolder, thisMonday.getTime());
            this.programList[result["timestamp"]] = result["list"];
            return this.programList[result["timestamp"]] || [];
        }
        else {
            // is programlist is stored in the app, then resturn parameter (this.programlist) first
            return this.programList[thisMonday.getTime()];
        }
    }
        
}

export default ChinasunService;

