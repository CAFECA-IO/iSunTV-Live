import { Controller, Post, Body } from '@nestjs/common';
import { SendMailService } from '../service/sendmail.service'; 

@Controller('sendmail')
export class SendMailController {
  
sendmailService: SendMailService;
xlsFolder: string;

constructor(){
    this.sendmailService = new SendMailService;
}
  
  @Post()
  async sendMail(@Body() body):Promise<any>{
    return this.sendmailService.sendMail(body);
  }
}