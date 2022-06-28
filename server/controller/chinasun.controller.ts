import { Controller, Get ,Param} from '@nestjs/common';
import { ChinasunService } from '../service/chinasun.service'; 

@Controller('chinasun')
//export 寫下面
export class ChinasunController {
  
    chinasunService: ChinasunService;
    xlsFolder: string;
    jsonFile: string;

    //initialize獨立新的initial行為function
    constructor() {
        this.chinasunService = new ChinasunService();
        this.jsonFile=process.cwd()+'/playlist.json';   
    }
 
    @Get('updated_files')
    async getUpdated_details(){
        //show the latest data
        const data = this.chinasunService.getUpdatedData();
        return await data;
    }

}