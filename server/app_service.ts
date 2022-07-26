import { Injectable } from '@nestjs/common';

// need to be modified
@Injectable()
class AppService {

  xlsFolder: string;
  jsonFile: string;
  Content: JSON;

  constructor() {

    this.xlsFolder = process.cwd() + '/xls';
    this.Content = null;
  
  }
}

export default AppService;