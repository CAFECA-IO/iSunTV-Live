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
      
      GOOGLE_CLIENT_ID: this.configService.get('GOOGLE_CLIENT_ID'),
      GOOGLE_CLIENT_PASSWORD: this.configService.get('GOOGLE_CLIENT_PASSWORD')

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