import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SendMailService from '../service/sendmail.service'; 

@Controller('sendmail')
class SendMailController {
  
sendmailService: SendMailService;

  constructor(private readonly configService: ConfigService) {
    
      this.sendmailService = new SendMailService;
      this.initialize();

  }

  // initialize the email config and sendmail service
  initialize() {
  
    const CONFIG = {
      
      USER: "clemmy.liao@mermer.cc",
      REFERSH_TOKEN: this.configService.get('REFRESH_TOKEN'),
      ACCESS_TOKEN: this.configService.get('ACCESS_TOKEN'),
      CLIENT_ID: this.configService.get('CLIENT_ID'),
      CLIENT_SECRET: this.configService.get('CLIENT_SECRET')

    }
    
    this.sendmailService.initialze(CONFIG);

  }


  @Post()
  async sendMail(@Body('comment') comment: string) {

    return await this.sendmailService.sendMail(comment);

  }

}

export default SendMailController;