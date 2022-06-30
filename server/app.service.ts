import { Injectable ,OnModuleInit} from '@nestjs/common';
import * as fs from 'fs';
import * as hound from 'hound';

// need to be modified
@Injectable()
class AppService {

  xlsFolder: string;
  jsonFile: string;
  Content: JSON;

  constructor() {

    this.xlsFolder=process.cwd()+'/xls';
    this.Content=null;
  
  }

  dostuff(){
       // Create a file watcher.
       const watcher = hound.watch(this.xlsFolder)

       // Add callbacks for file and directory events.  The change event only applies
       // to files.
       watcher.on('create', function(file, stats) {

        const data = this.chinasunService.getUpdatedData(); 
        let jsonFile=process.cwd()+'/playlist.json';
        fs.writeFile(jsonFile, JSON.stringify(data), { 
           encoding:"utf8", 
           flag:"w"
        }, 
        (err) => { 
        
          if (err) {  
        
            console.log(err); 
        
          } else { 
        
            console.log("File written successfully\n"); 
            console.log("The written has the following contents:"); 
            console.log(fs.readFileSync(jsonFile, "utf8")); 
           
          } 
       });
       console.log(file + ' was created');
       })
       watcher.on('change', function(file, stats) {
            // 確認否為最新的file 若為最新的 就更新json檔案
            console.log(file + ' was changed')
       })
       watcher.on('delete', function(file) {
         console.log(file + ' was deleted')
       })
  }
}

export default AppService;