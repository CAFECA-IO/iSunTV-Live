import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import FormatterService from 'server/utils/Formatter.service';
import ChinasunService from '../service/chinasun.service'; 
import { errorCode } from 'server/utils/ErrorCode';

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
    constructor(private readonly configService: ConfigService) {
    
        this.chinasunService = new ChinasunService();
        this.initialize();
    
    }

    //A initialization method
    /**
     * get the filelist with given options
     */
    initialize() {
        // 先執行config
        const XLSFOLDER_DIR = process.cwd() + this.configService.get('XLSFOLDER_DIR');
        const config = {XLSFOLDER_DIR};
        this.chinasunService.initialize(config);
    
    }

    /**
     * handle the chinasun/updated_files route
     * @controller ChinasunController
     */
    @Get('programlist')
    async getUpdated_details() {
        //get the latest data
        let data;
        let result;

        // handle the error
        try{
            data = await this.chinasunService.getUpdatedData(); 
            result = FormatterService.formatData(true,errorCode.NO_ERROR_FOUND,"programlist",data);
        }catch(e){
            result = FormatterService.formatData(true,e.code,e.message,data);
        }
        
        return result;
    }

}

export default ChinasunController ;

