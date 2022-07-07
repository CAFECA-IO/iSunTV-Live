import { Controller, Get } from '@nestjs/common';
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
    console.log("config");
    console.log(CONFIG);
    this.sendmailService.initialze(CONFIG);

  }


  @Get()
  async sendMail() {

    return await this.sendmailService.sendMail();

  }

}

export default SendMailController;