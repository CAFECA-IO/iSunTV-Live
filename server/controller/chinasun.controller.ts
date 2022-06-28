import { Controller, Get ,Param} from '@nestjs/common';
import { ChinasunService } from '../service/chinasun.service'; 

@Controller('chinasun')
export class ChinasunController {
  
chinasunService: ChinasunService;
xlsFolder: string;
jsonFile: string;

constructor(){
    this.chinasunService= new ChinasunService;
    this.jsonFile=process.cwd()+'/playlist.json';
}
  
@Get('updated_files')
getUpdated_details()
{
    //show the latest data
    this.chinasunService.getUpdatedData().then(v => {
        console.log(v);
        return v;
      });
    

}

}