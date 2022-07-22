import { Controller, Get, Res } from '@nestjs/common';

@Controller()
class AppController {
  @Get()
  getHello() {
    return 404;
  }
}

export default AppController;