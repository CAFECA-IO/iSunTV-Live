import { Controller, Get, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import FormatterService from 'server/utils/formatter_service';
import ChinasunService from '../service/chinasun_service'; 
import { ERROR_CODE } from 'server/constant/error_code';

// type definitaion
type apiResponse = { 
    powerby: string;
    success: boolean;
    code: string;
    message: string;
    payload: object;
};

// need to user Filter here
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

        this.chinasunService = new ChinasunService();
        this.initialize();
    
    }

    //A initialization method
    /**
     * get the filelist with given options
     */
    async initialize() {
        // 先執行config
        const xlsFolderDir = process.cwd() + this.configService.get('XLSFOLDER_DIR');
        const config = xlsFolderDir;
        this.chinasunService.initialize(config);
    
    }

    /**
     * handle the chinasun/updated_files route
     * @controller ChinasunController
     */
    //get programlist and  programlist?timestamp=
    @Get('programlist')
    // apigetprogramlist
    async apiGetProgramlist(@Query() query): Promise<apiResponse> {
        //get the latest data
        let data;
        let result;
        if(isNaN(parseInt(query.timestamp))) {
            // if user get timestamp without value
            try {

                data = await this.chinasunService.getProgramlist(); 
    
                // check data in this week or not
                result = FormatterService.formatData(true, ERROR_CODE.SUCCESS, "programlist", data);
    
            } catch (e) {
                
                result = FormatterService.formatData(true, e.code, e.message, data);
            }
        
        } else {
            // if user get timestamp with value
            try {

                data = await this.chinasunService.getProgramlistWithUnixTimestamp(query.timestamp); 

                // check data in this week or not
                result = FormatterService.formatData(true, ERROR_CODE.SUCCESS, "programlist", data);
            
            } catch (e) {
            
                result = FormatterService.formatData(true, e.code, e.message, data);
            
            }
        
        } 
        
        return result;
    }

}

export default ChinasunController ;

