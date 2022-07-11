import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SendMailService from '../service/sendmail.service'; 

@Controller('sendmail')
class SendMailController {

  /** @param {SendMailService} sendmailService handle the sendmail related service*/
  sendmailService: SendMailService;

  //the class constructor
  /**
   * set the default configservice and initialize the chinasun service
   * @param configService options to let user use config in the controller
   */
  constructor(private readonly configService: ConfigService) {

      this.sendmailService = new SendMailService;
      this.initialize();

  }

  // initialize the email config and sendmail service
  /**
   * initialize the SendMailService with the email config
   */
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

  // call the sendmail function in sendmail service
  /**
   * initialize the SendMailService with the email config
   */
  @Post()
  async sendMail(@Body('comment') comment: string) {

    return await this.sendmailService.sendMail(comment);

  }

}

export default SendMailController;