/* eslint-disable @typescript-eslint/no-explicit-any */
import {Body, Controller, Post} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import SendMailService from '../service/sendmail_service';

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
    this.sendmailService = new SendMailService();
    this.initialize();
  }

  // initialize the email config and sendmail service
  /**
   * initialize the SendMailService with the email config
   */
  initialize() {
    const config = {
      googleClientID: this.configService.get('GOOGLE_CLIENT_ID'),
      googleClientPassword: this.configService.get('GOOGLE_CLIENT_PASSWORD'),
    };

    this.sendmailService.initialze(config);
  }

  // call the sendmail function in sendmail service
  /**
   * initialize the SendMailService with the email config
   */
  @Post()
  async sendMail(@Body('comment') comment: string): Promise<any> {
    return await this.sendmailService.sendMail(comment);
  }
}

export default SendMailController;
