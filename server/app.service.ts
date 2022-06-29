import { Injectable ,OnModuleInit} from '@nestjs/common';
import * as fs from 'fs';
import * as hound from 'hound';
import * as xlsx from 'xlsx';

@Injectable()
class AppService implements OnModuleInit {

  xlsFolder: string;
  jsonFile: string;
  Content: JSON;

  onModuleInit() {
    console.log("Initialize the action of watching");
  }

  constructor(){
    this.xlsFolder=process.cwd()+'/xls';
    this.Content=null;
  }

  dostuff(){
       // Create a file watcher.
       const watcher = hound.watch(this.xlsFolder)

       // Add callbacks for file and directory events.  The change event only applies
       // to files.
       watcher.on('create', function(file, stats) {
         let File = xlsx.readFile(file,{type:'binary',cellDates:true});
         let Content = xlsx.utils.sheet_to_json(File.Sheets[File.SheetNames[0]]);
         let jsonFile=process.cwd()+'/playlist.json';
         console.log(Content);
         console.log();
         console.log(file + ' was created')
         fs.readFileSync(jsonFile, "utf8");
         fs.writeFile(jsonFile, JSON.stringify(Content), 
         { 
           encoding:"utf8", 
           flag:"w"
         }, 
         (err) => { 
           if (err) 
             console.log(err); 
           else { 
             console.log("File written successfully\n"); 
             console.log("The written has the following contents:"); 
             console.log(fs.readFileSync(jsonFile, "utf8")); 
           } 
       });
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