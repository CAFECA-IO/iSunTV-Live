import { Controller, Get, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import FormatterService from 'server/utils/Formatter.service';
import ChinasunService from '../service/chinasun.service'; 
import { ERROR_CODE } from 'server/utils/ErrorCode';

/**
 * handle the chinasun route
 * @controller ChinasunController
 */
@Controller('chinasun')
class ChinasunController {
  
    /** @param {ChinasunService} chinasunService handle the programlist related service*/
    chinasunService : ChinasunService;

    //the class constructor
    /**
     * set the default configservice and initialize the chinasun service
     * @param configService options to let user use config in the controller
     */
    constructor(private configService: ConfigService) {
    
        this.chinasunService = new ChinasunService(configService);
        this.initialize();
    
    }

    //A initialization method
    /**
     * get the filelist with given options
     */
    initialize() {
        // 先執行config
        const XLSFOLDER_DIR = process.cwd() + this.configService.get('XLSFOLDER_DIR');
        const config = { XLSFOLDER_DIR };
        this.chinasunService.initialize(config);
    
    }
    
    scanProgramlist() {
        // update the latest programlist
        this.chinasunService.getProgramlist();
    }

    /**
     * handle the chinasun/updated_files route
     * @controller ChinasunController
     */
    //get programlist and  programlist?timestamp=
    @Get('programlist')
    // apigetprogramlist
    async apiGetProgramlist(@Query() query) {
        //get the latest data
        let data;
        let result;
        console.log("query");
        console.log(query);

        if(typeof query.timestamp !== "undefined") {
            // if user get timestamp without value
            if (query.timestamp === "") {
                
                try {

                    data = await this.chinasunService.getProgramlist(); 
        
                    // check data in this week or not
                    result = FormatterService.formatData(true, ERROR_CODE.SUCCESS, "programlist", data);
        
                } catch (e) {
                    
                    result = FormatterService.formatData(true, e.code, e.message, data);
                }
                            
            } else {

                try {

                    data = await this.chinasunService.getProgramlistWithTimestamp(query.timestamp); 
        
                    // check data in this week or not
                    result = FormatterService.formatData(true, ERROR_CODE.SUCCESS, "programlist", data);
        
                } catch (e) {
                    
                    result = FormatterService.formatData(true, e.code, e.message, data);
                }

            }
            console.log("time");
            console.log(query.timestamp);
        
        } else {

            try {

                data = await this.chinasunService.getProgramlist(); 
    
                // check data in this week or not
                result = FormatterService.formatData(true, ERROR_CODE.SUCCESS, "programlist", data);
    
            } catch (e) {
                
                result = FormatterService.formatData(true, e.code, e.message, data);
            }
        
        } 

        // get the updated data and handle the error
        
        return result;
    }

}

export default ChinasunController ;

