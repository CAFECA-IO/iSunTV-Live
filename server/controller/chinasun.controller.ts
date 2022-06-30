import { Controller, Get ,Param} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ChinasunService from '../service/chinasun.service'; 


@Controller('chinasun')
//export 寫下面
class ChinasunController {
  
    constructor(private readonly configService: ConfigService) {

    }

    // initialize the middleware
    chinasunService = Object.assign( new ChinasunService(), {
        jsonFile: process.cwd()+this.configService.get('JSONFILE_DIR'),
        // json playlist
        xlsFolder: process.cwd()+this.configService.get('XLSFOLDER_DIR')
    });



    @Get('updated_files')
    async getUpdated_details(){
        //show the latest data
        const data = this.chinasunService.getUpdatedData();
        return await data;
    }

}
export default ChinasunController ;

