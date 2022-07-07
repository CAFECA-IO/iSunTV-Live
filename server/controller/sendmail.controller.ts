import { Controller, Get } from '@nestjs/common';
import SendMailService from '../service/sendmail.service'; 

@Controller('sendmail')
class SendMailController {
  
sendmailService: SendMailService;
xlsFolder: string;

  constructor() {
    
      this.sendmailService = new SendMailService;
  
  }
  
  @Get()
  async sendMail() {

    return await this.sendmailService.sendMail();

  }

}

export default SendMailController;