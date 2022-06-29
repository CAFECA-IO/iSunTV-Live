import { Controller, Get ,Param} from '@nestjs/common';
import ChinasunService from '../service/chinasun.service'; 

@Controller('chinasun')
//export 寫下面
class ChinasunController {
  
    xlsFolder: string;
    jsonFile: string;
    chinasunService: ChinasunService;
    //initialize獨立新的initial行為function
    constructor() {
        this.jsonFile=process.cwd()+'/playlist.json';   
    }

    //initilize
    initilize(){
        this.chinasunService = new ChinasunService();
    }


    @Get('updated_files')
    async getUpdated_details(){
        //show the latest data
        this.initilize();
        const data = this.chinasunService.getUpdatedData();
        return await data;
    }

}
export default ChinasunController ;