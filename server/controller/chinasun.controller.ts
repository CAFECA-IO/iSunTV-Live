import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ChinasunService from '../service/chinasun.service'; 


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
    
        this.chinasunService= new ChinasunService();
        this.initialize();
    
    }

    //A initialization method
    /**
     * get the filelist with given options
     */
    initialize() {

        this.chinasunService.xlsFolder=process.cwd()+this.configService.get('XLSFOLDER_DIR');
    
    }

    /**
     * handle the chinasun/updated_files route
     * @controller ChinasunController
     */
    @Get('updated_files')
    async getUpdated_details() {
        //get the latest data
        const data = this.chinasunService.getUpdatedData();
        return await data;
    }

}

export default ChinasunController ;

