import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { FormatterService } from '../service/formatter.service'; 

@Injectable()
export class SendMailService {

  formatterService: FormatterService;
  // include the formatter
  constructor(){
    this.formatterService=new FormatterService;
  }

  async sendMail(body): Promise<any>{
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'cs@isuntv.com', // generated ethereal user
                pass: 'gktkrgxfnvbyazta' // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        const mailOptions = {
            to: 'chuicl@isuntv.com', // list of receivers
            subject: '陽光衛視直播網站意見回覆', // Subject line
            html: body.comment // html body
        };

        let message;
        let resultCode;
        let send_status;

        // send mail with defined transport object
        return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error) => {
            if (error)
            {
                message = 'send failed';
                resultCode = "04999999";
                send_status = false;
            }
            else
            {
                message = 'sent successfully';
                resultCode = "00000000";
                send_status = true;
            }
            
            resolve(this.formatterService.FormatData(send_status,resultCode, message,null)); 

        });
    });
  }
}
