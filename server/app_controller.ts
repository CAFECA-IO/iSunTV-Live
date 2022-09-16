import {Controller, Get} from '@nestjs/common';

@Controller()
class AppController {
  @Get()
  getHello() {
    return 404;
  }
}

export default AppController;
